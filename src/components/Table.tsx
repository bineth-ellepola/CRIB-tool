import React, { useState } from 'react';
import '../styles/table.css';

interface TableProps {
  data: Array<{ [key: string]: string | number | boolean | null }>;
  isLoading?: boolean;
}

export const Table: React.FC<TableProps> = ({ data, isLoading = false }) => {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Define all columns based on complete XML structure
  const columns = [
    'BatchIdentifier',
    'ContractCode',
    'ParentContractCode',
    'ParentChildFlag',
    'BranchID',
    'AccountNumber',
    'PhaseOfCreditFacility',
    'CreditFacilityStatus',
    'PreviousContractCode',
    'PreviousSubscriberCode',
    'PreviousSourceCode',
    'PreviousBranchCode',
    'CreditFacilityType',
    'CreditFacilitySubtype',
    'CreditFacilitySubcategory',
    'OwnershipIndicator',
    'PrimaryCardLimit_Value',
    'PrimaryCardLimit_Currency',
    'PurposeOfCreditFacility',
    'Currency',
    'PackageLoanAmount_Value',
    'PackageLoanAmount_Currency',
    'AmountGrantedLimit_Value',
    'AmountGrantedLimit_Currency',
    'AmountWrittenOff_Value',
    'AmountWrittenOff_Currency',
    'InstallmentAmount_Value',
    'InstallmentAmount_Currency',
    'NumberOfInstallments',
    'CurrentBalance_Value',
    'CurrentBalance_Currency',
    'InterestOutstandingAmount_Value',
    'InterestOutstandingAmount_Currency',
    'AmountInArrears_Value',
    'AmountInArrears_Currency',
    'NumberOfDaysInArrears',
    'DateOfLastPaymentReceived',
    'RepaymentType',
    'FirstDisbursementDate',
    'CreditFacilityRestructuringDate',
    'MaturityDate',
    'CreditFacilityEndDate',
    'WrittenOffTerminatedDate',
    'LastAmountPaid_Value',
    'LastAmountPaid_Currency',
    'SecurityCoverage',
    'GuaranteeCoverage',
    'CustomerCode',
    'Salutation',
    'FullName',
    'Profession',
    'SpouseName',
    'ClassificationOfIndividual',
    'Gender',
    'DateOfBirth',
    'MaritalStatus',
    'FateStatus',
    'Employment',
    'Residency',
    'EmployerName',
    'BusinessName',
    'NICNumber',
    'PassportNumber',
    'DrivingLicenseNumber',
    'PreviousNICNumber',
    'BusinessRegistrationNumber',
    'BusinessRegistrationDate',
    'Mailing_City',
    'Mailing_PostalCode',
    'Mailing_Province',
    'Mailing_District',
    'Mailing_Country',
    'Mailing_AddressLine',
    'Permanent_City',
    'Permanent_PostalCode',
    'Permanent_Province',
    'Permanent_District',
    'Permanent_Country',
    'Permanent_AddressLine',
    'MobilePhone',
    'PhoneNumber',
    'PhoneNumber2',
    'Email',
    'MobileNumber2',
    'SubjectRole_CustomerCode',
    'RoleOfCustomer',
    'GuaranteeType',
  ];

  if (data.length === 0) {
    return <div className="no-data">No data available</div>;
  }

  // Sort data if a sort column is selected
  let sortedData = [...data];
  if (sortColumn) {
    sortedData.sort((a, b) => {
      const aValue = a[sortColumn] ?? '';
      const bValue = b[sortColumn] ?? '';
      
      const comparison = String(aValue).localeCompare(String(bValue));
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  return (
    <div className="table-container" style={{ position: 'relative' }}>
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th 
                key={column}
                className={sortColumn === column ? `sortable active ${sortDirection}` : 'sortable'}
                onClick={() => handleSort(column)}
                title={`Click to sort by ${column}`}
              >
                {column}
                {sortColumn === column && (
                  <span className="sort-indicator">{sortDirection === 'asc' ? ' ▲' : ' ▼'}</span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, rowIndex) => (
            <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'even' : 'odd'}>
              {columns.map((column) => (
                <td key={`${rowIndex}-${column}`}>
                  {formatCellValue(row[column])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {isLoading && (
        <div className="table-loading-overlay">
          <div className="table-loading-spinner"></div>
          <p>Refreshing data...</p>
        </div>
      )}
    </div>
  );
};

/**
 * Format cell value for display
 */
const formatCellValue = (value: string | number | boolean | null | undefined): string => {
  if (value === undefined || value === null) {
    return '-';
  }
  if (typeof value === 'boolean') {
    return value ? 'Yes' : 'No';
  }
  return String(value).trim();
};
