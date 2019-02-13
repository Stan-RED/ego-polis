<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
    xmlns="http://www.w3.org/1999/xhtml"
    xmlns:html="http://www.w3.org/1999/xhtml"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:msxsl="urn:schemas-microsoft-com:xslt"
    xmlns:xp="todo:codesophy:xpml">

    <xsl:param name="xp:file" />
    <xsl:param name="xp:root" />

    <xsl:variable name="languages">
        <xp:lang id="en" default="true">English</xp:lang>
        <xp:lang id="ru">Русский</xp:lang>
    </xsl:variable>

    <xsl:template match="/">
        <xsl:if test="$xp:root != 'false'">
            <xsl:processing-instruction name="xpml-copy">
                <xsl:value-of select="xp:PiArg('source', '~/ui/default.css')" />
                <xsl:value-of select="xp:PiArg('target', 'ui/default.css')" />
            </xsl:processing-instruction>
        </xsl:if>

        <xsl:for-each select="//xp:section">
            <xsl:processing-instruction name="xpml-transform">
                <xsl:value-of select="xp:PiArg('stylesheet', '~/ui/default.xsl')" />
                <xsl:value-of select="xp:PiSource($xp:file, @src)" />
                <xsl:value-of select="xp:PiArg('@root', 'false')" />
            </xsl:processing-instruction>
        </xsl:for-each>

        <xsl:for-each select="msxsl:node-set($languages)/xp:lang">
            <xsl:processing-instruction name="xpml-transform">
                <xsl:value-of select="xp:PiArg('stylesheet', '~/ui/translate.xsl')" />
                <xsl:value-of select="xp:PiArg('source', $xp:file)" />
                <xsl:value-of select="xp:PiTarget(@id, $xp:file)" />
                <xsl:value-of select="xp:PiArg('@lang', @id)" />
            </xsl:processing-instruction>
        </xsl:for-each>
    </xsl:template>
</xsl:stylesheet>