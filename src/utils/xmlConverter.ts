export interface TableData {
  [key: string]: string | number | boolean | null;
}

/**
 * Convert table data to XML format
 */
export const convertToXML = (data: TableData[], tableName: string = 'table'): string => {
  if (!data || data.length === 0) {
    return `<?xml version="1.0" encoding="UTF-8"?>\n<${tableName}></${tableName}>`;
  }

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += `<${tableName}>\n`;

  data.forEach((row, index) => {
    xml += `  <row id="${index + 1}">\n`;
    Object.entries(row).forEach(([key, value]) => {
      // Sanitize key to be valid XML element name
      const sanitizedKey = sanitizeXMLKey(key);
      // Escape XML special characters in value
      const escapedValue = escapeXML(String(value ?? ''));
      xml += `    <${sanitizedKey}>${escapedValue}</${sanitizedKey}>\n`;
    });
    xml += `  </row>\n`;
  });

  xml += `</${tableName}>`;
  return xml;
};

/**
 * Sanitize string to be valid XML element name
 */
const sanitizeXMLKey = (key: string): string => {
  // Remove special characters and spaces, replace with underscores
  let sanitized = key.replace(/[^a-zA-Z0-9_-]/g, '_');
  // Ensure it doesn't start with a number
  if (/^\d/.test(sanitized)) {
    sanitized = '_' + sanitized;
  }
  // Ensure it's not empty
  return sanitized || 'field';
};

/**
 * Escape XML special characters
 */
const escapeXML = (str: string): string => {
  const xmlChar: { [key: string]: string } = {
    '<': '&lt;',
    '>': '&gt;',
    '&': '&amp;',
    '"': '&quot;',
    "'": '&apos;',
  };
  return str.replace(/[<>&"']/g, (char) => xmlChar[char] || char);
};

/**
 * Download XML file
 */
export const downloadXML = (xmlContent: string, fileName: string = 'data.xml'): void => {
  const element = document.createElement('a');
  const file = new Blob([xmlContent], { type: 'application/xml' });
  element.href = URL.createObjectURL(file);
  element.download = fileName;
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
  URL.revokeObjectURL(element.href);
};

/**
 * Convert table data to XML and download
 */
export const downloadTableAsXML = (
  data: TableData[],
  fileName: string = 'table_data.xml',
  tableName: string = 'table'
): void => {
  const xmlContent = convertToXML(data, tableName);
  downloadXML(xmlContent, fileName);
};
