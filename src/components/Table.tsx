import React from 'react';
import '../styles/table.css';

interface TableProps {
  data: Array<{ [key: string]: string | number | boolean }>;
}

export const Table: React.FC<TableProps> = ({ data }) => {
  // Hardcoded column headers
  const columns = ['col1', 'col2', 'col3', 'col4' , 'col5' , 'col6', 'col7', 'col8', 'col9', 'col10'];

  if (data.length === 0) {
    return <div className="no-data">No data available</div>;
  }

  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => {
            // Get the first 10 values from the data row
            const rowValues = Object.values(row).slice(0, 10);
            
            return (
              <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'even' : 'odd'}>
                {columns.map((_, colIndex) => (
                  <td key={`${rowIndex}-${colIndex}`}>
                    {formatCellValue(rowValues[colIndex])}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

/**
 * Format cell value for display
 */
const formatCellValue = (value: string | number | boolean | undefined): string => {
  if (value === undefined || value === null) {
    return '-';
  }
  if (typeof value === 'boolean') {
    return value ? 'Yes' : 'No';
  }
  return String(value);
};
