<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns="http://www.w3.org/1999/xhtml" xmlns:html="http://www.w3.org/1999/xhtml" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:msxsl="urn:schemas-microsoft-com:xslt" xmlns:xp="ego:stan:xpml">

    <xsl:param name="xp:file" />

    <xsl:variable name="languages">
        <xp:lang id="en" default="true">English</xp:lang>
        <xp:lang id="ru">Русский</xp:lang>
    </xsl:variable>

    <xsl:template match="/">
        <xsl:for-each select="msxsl:node-set($languages)/xp:lang">
            <xsl:processing-instruction name="xpml-transform">
                <xsl:value-of select="xp:PiArg('stylesheet', 'translate.xsl')" />
                <xsl:value-of select="xp:PiArg('source', $xp:file)" />
                <xsl:value-of select="xp:PiOutput('target', $xp:file, @id, @default)" />
                <xsl:value-of select="xp:PiArg('@lang', @id)" />
            </xsl:processing-instruction>
        </xsl:for-each>
    </xsl:template>
</xsl:stylesheet>