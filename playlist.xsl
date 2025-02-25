<?xml version="1.0"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
    <xsl:template match="/">
                <table id="table" class="indent">
                    <thead>
                        <tr>
                            <th colspan="4">Here is your russian roullet.</th>
                        </tr>
                        <tr>
                            <th>Channel</th>
                            <th>PublishedDate</th>
                            <th>Title</th>
                            <th>URL</th>
                        </tr>
                    </thead>
                    <tbody>
                        <xsl:for-each select="item/element">
                         <xsl:attribute name="english">
                                        <xsl:value-of select="boolean(./@english)" />
                                    </xsl:attribute>
                                <tr id="{position()}">
                                    <td>
                                        <xsl:value-of select="Channel" />
                                    </td>
                                    <td>
                                        <xsl:value-of select="PublishedDate" />
                                    </td>
                                     <td>
                                        <xsl:value-of select="Title" />
                                    </td>
                                     <td>
                                         <a href="{URL}">
                                        <xsl:value-of select="URL" />
                                        </a>
                                    </td>
                                    <xsl:attribute name="english">
                                        <xsl:value-of select="boolean(./@english)" />
                                    </xsl:attribute>
                                </tr>
                        </xsl:for-each>
                    </tbody>
                </table>
    </xsl:template>
</xsl:stylesheet>