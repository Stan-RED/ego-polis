Clear-Host
Set-StrictMode -Version 5.0
Set-Location ([System.Environment]::CurrentDirectory = $PSScriptRoot)

# (XML Publishing | eXPerimental) markup language
$Global:XPML = 'xpml'
$Global:XPML_NS = "todo:codesophy:$($Global:XPML)"
$InformationPreference = [System.Management.Automation.ActionPreference]::Continue
$ErrorActionPreference = [System.Management.Automation.ActionPreference]::Stop

class XpmlInstruction {
    [hashtable]$Args = @{}

    [void] Configure([XpmlInstruction]$Parent, [hashtable]$Settings) {
        $this.Args = $Parent.Args.Clone();
    }

    [System.Xml.XPath.XPathNavigator] Execute([XpmlContext]$Context) { return $null }
}

class XpmlTransform : XpmlInstruction {
    [string]$Source
    [string]$Target
    [string]$Stylesheet
    [System.Xml.XmlWriterSettings]$WriterSettings = [System.Xml.XmlWriterSettings]::new()

    [void] Configure([XpmlInstruction]$Parent, [hashtable]$Settings) {
        ([XpmlInstruction]$this).Configure($Parent, $Settings);

        $this.Source = $Settings.source
        if ($Settings['target']) {
            $this.Target = $Settings.target
        }
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
            $xslArgs.AddParam('target', $Global:XPML_NS, $this.Target);
        }
        $Context.Log($message)

        [xml]$xml = [xml]::new()
        $src = $context.GetPath($this.Source)
        $xml.Load($src)

        [xml]$result = [xml]::new()
        $navigator = $result.CreateNavigator()
        $writer = $navigator.AppendChild()

        Try {
            $xsl.Transform($xml, $xslArgs, $writer, $Context.Resolver)
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
        $this.WriterSettings.OmitXmlDeclaration = $true;
    }
}

class XpmlDelete : XpmlInstruction {
    [string]$Path

    [void] Configure([XpmlInstruction]$Parent, [hashtable]$Settings) {
        ([XpmlInstruction]$this).Configure($Parent, $Settings);

        $this.Path = $Settings.path
    }

    [System.Xml.XPath.XPathNavigator] Execute([XpmlContext]$Context) {
        $Context.Log("Deleting $($this.Path)...")

        $target = $context.GetPath($this.Path)
        Remove-Item $target -Force

        return $null
    }
}

class XpmlCopy : XpmlInstruction {
    [string]$Source
    [string]$Target

    [void] Configure([XpmlInstruction]$Parent, [hashtable]$Settings) {
        ([XpmlInstruction]$this).Configure($Parent, $Settings);

        $this.Source = $Settings.source
        $this.Target = $Settings.target
    }

    [System.Xml.XPath.XPathNavigator] Execute([XpmlContext]$Context) {
        $Context.Log("Copying $($this.Source) to $($this.Target)...")

        $src = $context.GetPath($this.Source)
        $dest = $context.GetPath($this.Target)
        
        $context.TouchDir($dest)

        Copy-Item -Path $src -Destination $dest -Recurse -Force

        return $null
    }
}

class XpmlPipeline {
    [XpmlContext]$Context
    [hashtable]$Handlers
    [System.Collections.Queue]$Items = [System.Collections.Queue]::new()

    [void] LoadItems(
        [XpmlInstruction]$Parent,
        [System.Xml.XPath.XPathNavigator]$Navigator
    ) {
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
                $instance.Configure($Parent, $params)
                $this.Items.Enqueue($instance)
            }
    }

    [void] Add([XpmlInstruction]$item) {
        $this.Items.Enqueue($item);
    }

    [void] Run() {
        while ($this.Items.Count -gt 0) {
            $item = $this.Items.Dequeue();

            $navigator = $item.Execute($this.Context);

            if ($navigator) {
                $this.LoadItems($item, $navigator);
            }
        }
    }

    XpmlPipeline([XpmlContext]$context) {
        $this.Context = $context;

        $this.Handlers = @{
            delete = [XpmlDelete]
            copy = [XpmlCopy]
            transform = [XpmlTransform]
        }
    }
}

class XpmlResolver : System.Xml.XmlUrlResolver {
    [string]$Home
    [string]$Output

    [string] GetPath([string]$Path) {
        $Path = $Path.TrimStart('/');
        
        if ([System.IO.Path]::IsPathRooted($Path)) {
            return $Path;
        }

        if ($Path.StartsWith('~')) {
            return [System.IO.Path]::Combine($this.Home, $Path.Remove(0, 1).Trim('/'));
        }

        return [System.IO.Path]::Combine($this.Home, $this.Output, $Path);
    }

    [uri] ResolveUri([uri]$BaseUri, [string]$RelativeUri) {
        $path = $RelativeUri.TrimStart('/');

        if ([System.IO.Path]::IsPathRooted($path)) {
            return ([System.Xml.XmlUrlResolver]$this).ResolveUri($BaseUri, $RelativeUri);
        }

        $uri = [uri]::new($path, [System.UriKind]::RelativeOrAbsolute);
        if ($uri.IsAbsoluteUri) {
            return ([System.Xml.XmlUrlResolver]$this).ResolveUri($BaseUri, $RelativeUri);
        }

        $result = $this.GetPath($RelativeUri);
        return $result;
    }

    XpmlResolver([string]$Folder) {
        $this.Home = $Folder;
        $this.Output = '.build'
    }
}

class XpmlContext {
    [System.Xml.XmlUrlResolver]$Resolver
    [System.Xml.Xsl.XsltSettings]$XslSettings

    [System.Xml.XPath.XPathNodeIterator] XPath([System.Xml.XPath.XPathNodeIterator]$Root, [System.Xml.XPath.XPathNodeIterator]$Path) {
        [System.Xml.XPath.XPathNavigator]$navigator = ($Root | Select-Object -First 1)
        return $navigator.Evaluate($Path, $navigator);
    }

    [System.Xml.Xsl.XsltArgumentList] GetXslArgs([string]$File) {
        $result = [System.Xml.Xsl.XsltArgumentList]::new()

        $result.AddExtensionObject($Global:XPML_NS, $this)
        $result.AddParam('home', $Global:XPML_NS, $this.Resolver.Home)
        $result.AddParam('file', $Global:XPML_NS, $File)

        return $result
    }

    [string] GetDirectory([string]$Path) {
        $result = $Path.Trim('/', '\');
        $result = [System.IO.Path]::GetDirectoryName($result);
        $result = $result.Replace('\', '/')
        return $result
    }

    [string] GetSection([string]$Master, [string]$Child) {
        $path = $this.GetDirectory($Master)

        $result = @( $Child, "$Child.xml", "$Child/index.xml") `
        | ForEach-Object {
            if ($path) { "$path/$_" } else { $_ }
        } `
        | Where-Object {
            $resolved = $this.GetPath($_)
            return (Test-Path $resolved)
        } `
        | Select-Object -First 1

        if (-not($result)) {
            throw "Section $Child for $Master not found"
        }

        return $result;
    }

    [string] GetHtmlRoute([string]$Path) {
        $index = 'index'
        [System.IO.FileInfo]$file = [System.IO.FileInfo]::new($Path)
        $result = $Path.Substring(0, $Path.Length - $file.Extension.Length);

        if ($result.EndsWith("/$index") -or ($result -eq $index)) {
            $result = $result.Substring(0, $result.Length - $index.Length).TrimEnd('/');
        }

        return "/$result";
    }

    [string] PiArg([string]$Name, [string]$Value) {
        return "$Name=`"$Value`" "
    }

    [string] PiTarget([string]$Folder, [string]$File) {
        $File = $File.TrimStart('~', '/')
        return $this.PiArg('target', "$Folder/$File");
    }

    [string] PiSource([string]$Base, [string]$Refer) {
        $path = $this.GetSection($Base, $Refer)
        return $this.PiArg('source', $path);
    }

    [string] PiFile([string]$Attribute, [string]$File, [string]$Extension) {
        $path = $File
        if ($Extension) {
            $path = [System.IO.Path]::ChangeExtension($File, ".$Extension")
        }
        return "$Attribute=`"$path`"";
    }

    [System.Xml.Xsl.XslCompiledTransform] CreateTransformation([string]$Stylesheet) {
        $result = [System.Xml.Xsl.XslCompiledTransform]::new()
        $result.Load($Stylesheet, $this.XslSettings, $this.Resolver)
        return $result
    }

    [string] GetPath([string]$Path) {
        return $this.Resolver.GetPath($Path)
    }

    [void] TouchDir([string]$Path) {
        $folder = [System.IO.Path]::GetDirectoryName($Path)
        New-Item -ItemType Directory -Force -Path $folder
    }

    [void] Log([string]$Message) {
        Write-Information "[PIPE]$Message"
    }

    XpmlContext([string]$Folder) {
        $this.Resolver = [XpmlResolver]::new($Folder)

        $this.XslSettings = [System.Xml.Xsl.XsltSettings]::new()
        $this.XslSettings.EnableScript = $true
        $this.XslSettings.EnableDocumentFunction = $true
    }

    static [XpmlContext] Create() {
        $folder = (Get-Location)
        return [XpmlContext]::new($folder)
    }
}

#TODO:
Remove-Item .\.build -Recurse -Force -ErrorAction SilentlyContinue

[XpmlContext]$context = [XpmlContext]::Create()
[XpmlPipeline]$pipeline = [XpmlPipeline]::new($context)

[XpmlTransform]$main = [XpmlTransform]::new()
$main.Source = '~/index.xml'
$main.Stylesheet = '~/ui/default.xsl'
$pipeline.Add($main)

$pipeline.Run()
