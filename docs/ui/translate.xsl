<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
    xmlns="http://www.w3.org/1999/xhtml"
    xmlns:html="http://www.w3.org/1999/xhtml"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xp="todo:codesophy:xpml">

    <xsl:param name="xp:target" />
    <xsl:param name="xp:lang" />

    <xsl:template match="/">
        <xsl:processing-instruction name="xpml-transform">
            <xsl:value-of select="xp:PiArg('stylesheet', '~/ui/html.xsl')" />
            <xsl:value-of select="xp:PiArg('source', $xp:target)" />
            <xsl:value-of select="xp:PiArg('target', concat(xp:GetHtmlRoute($xp:target), '/index.html'))" />
        </xsl:processing-instruction>

        <xsl:processing-instruction name="xpml-delete">
            <xsl:value-of select="xp:PiArg('path', $xp:target)" />
        </xsl:processing-instruction>

        <xsl:apply-templates />
    </xsl:template>

    <xsl:template match="@*|node()">
        <xsl:copy>
            <xsl:apply-templates select="@*|node()" />
        </xsl:copy>
    </xsl:template>

    <xsl:template match="html:*[@xp:lang]">
        <xsl:if test="@xp:lang = $xp:lang">
            <xsl:choose>
                <xsl:when test="count(./node()) = 0">
                    <xsl:copy>
                        <xsl:attribute name="xp-todo">translation</xsl:attribute>
                        <xsl:apply-templates select="@*|node()" />
                        <xsl:text>Translation expected</xsl:text>
                    </xsl:copy>
                </xsl:when>

                <xsl:otherwise>
                    <xsl:copy>
                        <xsl:apply-templates select="@*|node()" />
                    </xsl:copy>
                </xsl:otherwise>
            </xsl:choose>
        </xsl:if>
    </xsl:template>
</xsl:stylesheet>