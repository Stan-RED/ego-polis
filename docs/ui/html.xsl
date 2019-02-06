<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
    xmlns="http://www.w3.org/1999/xhtml"
    xmlns:html="http://www.w3.org/1999/xhtml"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xp="todo:codesophy:xpml">

    <xsl:output method="html" encoding="utf-8" indent="yes" />

    <xsl:param name="xp:lang" />
    <xsl:param name="xp:file" />

    <xsl:template match="/xp:topic">
        <html>
            <head>
                <title><xsl:value-of select="html:title" /></title>
                <link rel="stylesheet" href="/ui/default.css" type="text/css" />
            </head>
            <body>
                <h1><xsl:value-of select="html:title/text()" /></h1>

                <!--TODO:Extract to TOC template?-->
                <!-- <xsl:if test="count(//xp:section) > 0">
                    <ol>
                        <xsl:for-each select="//xp:section">
                            <li>
                                <a>
                                    <xsl:attribute name="href">
                                        <xsl:value-of select="xp:GetHtmlRoute(xp:GetSection($xp:file, @src))" />
                                    </xsl:attribute>
                                    <xsl:value-of select="document(xp:GetSection($xp:file, @src))//html:title/text()" />
                                </a>
                            </li>
                        </xsl:for-each>
                    </ol>
                </xsl:if> -->

                <xsl:apply-templates />
            </body>
        </html>
    </xsl:template>

    <xsl:template match="@*|node()">
        <xsl:copy>
            <xsl:apply-templates select="@*|node()" />
        </xsl:copy>
    </xsl:template>

    <xsl:template match="html:title" />

    <xsl:template match="xp:section">
        <a class="section">
            <xsl:attribute name="href">
                <xsl:value-of select="xp:GetHtmlRoute(xp:GetSection($xp:file, @src))" />
            </xsl:attribute>
            <xsl:value-of select="document(xp:GetSection($xp:file, @src))//html:title/text()" />
        </a>
    </xsl:template>

    <!-- TODO:Ideally should be removed -->
    <xsl:template match="processing-instruction()" />

    <xsl:template match="xp:todo">
        <p xp-todo="idea">
            <xsl:apply-templates />
        </p>
    </xsl:template>
</xsl:stylesheet>