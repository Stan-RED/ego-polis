<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
    xmlns="http://www.w3.org/1999/xhtml"
    xmlns:html="http://www.w3.org/1999/xhtml"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xp="ego:stan:xpml">

    <xsl:param name="xp:lang" />

    <xsl:template match="/">
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
                        <xsl:attribute name="xp:todo">yes</xsl:attribute>
                        <xsl:apply-templates select="@*|node()" />
                        <xsl:text>TODO:Translation not complete</xsl:text>
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