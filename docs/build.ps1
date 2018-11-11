Clear-Host
Set-StrictMode -Version 5.0
Set-Location ([System.Environment]::CurrentDirectory = $PSScriptRoot)

# (XML Publishing | eXPerimental) markup language
$Global:XPML = 'xpml'
$Global:XPML_NS = "ego:stan:$($Global:XPML)"
$InformationPreference = [System.Management.Automation.ActionPreference]::Continue

class XpmlInstruction {
    [void] Configure([hashtable]$Settings) {}
    [System.Xml.XPath.XPathNavigator] Execute([XpmlContext]$Context) { return $null }
}

class XpmlTransform : XpmlInstruction {
    [string]$Source
    [string]$Target
    [string]$Stylesheet
    [hashtable]$Args = @{}
    [System.Xml.XmlWriterSettings]$WriterSettings = [System.Xml.XmlWriterSettings]::new()

    [void] Configure([hashtable]$Settings) {
        $this.Source = $Settings.source
        $this.Target = $Settings.target
        $this.Stylesheet = $Settings.stylesheet

        $Settings.GetEnumerator() | Where-Object { $_.Key -like '@*' } | ForEach-Object {
            $this.Args.Add($_.Key.Remove(0, 1), $_.Value)
        }
    }

    [System.Xml.XPath.XPathNavigator] Execute([XpmlContext]$Context) {
        $xslFile = $context.GetPath($this.Stylesheet)
        $xsl = $context.CreateTransformation($xslFile)
        $xslArgs = $context.GetXslArgs($this.Source)

        $msgArgs = @()
        $this.Args.GetEnumerator() | ForEach-Object {
            $xslArgs.AddParam($_.Key, $Global:XPML_NS, $_.Value);
            $msgArgs += "$($_.Key)=$($_.Value)";
        }

        $message = "Transforming $($this.Source) using $($this.Stylesheet)"
        if ($msgArgs.Length -gt 0) {
            $message = "$message($($msgArgs -join ';'))"
        }
        if ($this.Target) {
            $message = "$message to $($this.Target)"
        }
        Write-Information $message

        [xml]$xml = [xml]::new()
        $src = $context.GetPath($this.Source)
        $xml.Load($src)

        [xml]$result = [xml]::new()
        $navigator = $result.CreateNavigator()
        $writer = $navigator.AppendChild()

        Try {
            $xsl.Transform($xml, $xslArgs, $writer)
        } Catch {
            Write-Error $_.Exception.InnerException
        } Finally {
            $writer.Dispose()
        }

        if ($this.Target) {
            $path = $context.GetPath($this.Target)
            $context.TouchDir($path)
            
            $writer = [System.Xml.XmlWriter]::Create($path, $this.WriterSettings)
            Try {
                $result.Save($writer)
            } Finally {
                $writer.Dispose()
            }
        }

        return $navigator
    }

    XpmlTransform() {
        $this.WriterSettings.Indent = $true;
    }
}

class XpmlPipeline {
    [XpmlContext]$Context
    [hashtable]$Handlers
    [System.Collections.Stack]$Items = [System.Collections.Stack]::new()

    [void] LoadItems([System.Xml.XPath.XPathNavigator]$Navigator) {
        [regex]$pattern = [regex]'(@?\w+)=\"([^\"]+)\"'
        [string]$prefix = "$($Global:XPML)-"

        $Navigator.Evaluate('processing-instruction()') | `
            Where-Object { $_.LocalName.StartsWith($prefix) } | `
            ForEach-Object {
                [hashtable]$params = @{}
                $pattern.Matches($_) | ForEach-Object {
                    $params[$_.Groups[1].Value] = $_.Groups[2].Value;
                }

                $id = $_.LocalName.Remove(0, $prefix.Length)
                $handler = $this.Handlers[$id]
                if (-not($handler)) {
                    throw "XPML handler $($element.LocalName) not found"
                }

                $instance = New-Object -TypeName $handler
                $instance.Configure($params)
                $this.Items.Push($instance)
            }
    }

    [void] Add([XpmlInstruction]$item) {
        $this.Items.Push($item);
    }

    [void] Run() {
        while ($this.Items.Count -gt 0) {
            $item = $this.Items.Pop();

            $navigator = $item.Execute($this.Context);

            if ($navigator) {
                $this.LoadItems($navigator);
            }
        }
    }

    XpmlPipeline([XpmlContext]$context) {
        $this.Context = $context;

        $this.Handlers = @{
            transform = [XpmlTransform]
        }
    }
}

class XpmlContext {
    [string]$FilePath
    [string]$FileName
    [string]$Home
    [string]$Output

    [System.Xml.XmlUrlResolver]$Resolver
    [System.Xml.Xsl.XsltSettings]$XslSettings

    [System.Xml.XPath.XPathNodeIterator] XPath([System.Xml.XPath.XPathNodeIterator]$Root, [System.Xml.XPath.XPathNodeIterator]$Path) {
        [System.Xml.XPath.XPathNavigator]$navigator = ($Root | Select-Object -First 1)
        return $navigator.Evaluate($Path, $navigator);
    }

    [string] PiArg([string]$Name, [string]$Value) {
        return "$Name=`"$Value`" "
    }

    [System.Xml.Xsl.XsltArgumentList] GetXslArgs([string]$File) {
        $result = [System.Xml.Xsl.XsltArgumentList]::new()

        $result.AddExtensionObject($Global:XPML_NS, $this)
        $result.AddParam('home', $Global:XPML_NS, $this.Home)
        $result.AddParam('file', $Global:XPML_NS, $File)

        return $result
    }

    [string] GetSuffixedFile([string]$File, [string]$Suffix, [bool]$Default) {
        if ($Default) {
            return $File;
        } else {
            $extension = [System.IO.Path]::GetExtension($File)
            return [System.IO.Path]::ChangeExtension($File, ".$Suffix$extension")
        }
    }

    [string] PiOutput([string]$Attribute, [string]$File, [string]$Suffix, [bool]$Default) {
        $path = $this.GetSuffixedFile($File, $Suffix, $Default);
        return "$Attribute=`"`$$([System.IO.Path]::DirectorySeparatorChar)$path`"";
    }

    [System.Xml.Xsl.XslCompiledTransform] CreateTransformation([string]$Stylesheet) {
        $result = [System.Xml.Xsl.XslCompiledTransform]::new()
        $result.Load($Stylesheet, $this.XslSettings, $this.Resolver)
        return $result
    }

    [string] GetPath([string]$Path) {
        if ([System.IO.Path]::IsPathRooted($Path)) {
            return $Path;
        }

        if ($Path.StartsWith('$')) {
            return [System.IO.Path]::Combine($this.Home, $this.Output) + $Path.Remove(0, 1);
        }

        return [System.IO.Path]::Combine($this.Home, $Path)
    }

    [void] TouchDir([string]$Path) {
        $folder = [System.IO.Path]::GetDirectoryName($Path)
        New-Item -ItemType Directory -Force -Path $folder
    }

    XpmlContext([string]$Folder) {
        $this.Resolver = [System.Xml.XmlUrlResolver]::new()

        $this.XslSettings = [System.Xml.Xsl.XsltSettings]::new()
        $this.XslSettings.EnableScript = $true
        $this.XslSettings.EnableDocumentFunction = $true
        
        $this.Home = $Folder;
        $this.Output = '.build'
    }

    static [XpmlContext] Create() {
        $folder = (Get-Location)
        return [XpmlContext]::new($folder)
    }
}

[XpmlContext]$context = [XpmlContext]::Create()
[XpmlPipeline]$pipeline = [XpmlPipeline]::new($context)

[XpmlTransform]$main = [XpmlTransform]::new()
$main.Source = 'index.xml'
$main.Stylesheet = 'default.xsl'
$pipeline.Add($main)

$pipeline.Run()
