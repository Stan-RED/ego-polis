<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
                xmlns="http://www.w3.org/1999/xhtml"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:code="http://codesophy.org">

  <xsl:output omit-xml-declaration="yes" indent="yes" method="xml" />

  <xsl:template match="@*|node()">
    <xsl:copy>
      <xsl:apply-templates select="@*|node()"/>
    </xsl:copy>
  </xsl:template>

  <xsl:template match="/">
    <!--TODO:xml:lang-->
    <html>
      <head>
        <meta charset="utf-8" />
        <!--TODO: <meta name="description" content="" /> -->
        <meta http-equiv="x-ua-compatible" content="ie=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

        <!--TODO: <title></title> -->

        <!--TODO: <link rel="manifest" href="site.webmanifest"> -->
        <!--TODO: <link rel="apple-touch-icon" href="icon.png"> -->
        <link rel="stylesheet" href="/ui/default.css" />
      </head>
      <body>
        <xsl:apply-templates />
      </body>
    </html>
  </xsl:template>

  <xsl:template match="//*[@code:src]">
    <xsl:copy-of select="document(@code:src)/*" />
  </xsl:template>

</xsl:stylesheet>