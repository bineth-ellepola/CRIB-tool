import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import apiService from '../services/apiService';
import { downloadTableAsXML } from '../utils/xmlConverter';
import { Table } from './Table';
import '../styles/dashboard.css';

export interface TableData {
  [key: string]: string | number | boolean;
}

export const Dashboard: React.FC = () => {
  const [data, setData] = useState<TableData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Replace '/data' with your actual API endpoint
      const result = await apiService.fetchData<TableData>('/data');
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
      // For demo purposes, set sample data if API fails
      setData(getSampleData());
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleExportXML = () => {
    if (data.length === 0) {
      alert('No data to export');
      return;
    }
    downloadTableAsXML(data, 'sejaya_crib_data.xml');
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-left">
            <img src="/Logo.jpg" alt="Sejaya Logo" className="navbar-logo" />
            <h1>Dashboard</h1>
          </div>
          <div className="user-info">
            {user && <span>Welcome, {user.email || user.name}</span>}
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="controls">
          <button onClick={fetchData} disabled={isLoading} className="refresh-btn">
            {isLoading ? 'Loading...' : 'Refresh Data'}
          </button>
          <button onClick={handleExportXML} disabled={isLoading || data.length === 0} className="export-btn">
            Convert to XML
          </button>
        </div>

        {error && (
          <div className="warning-message">
            <p>{error}</p>
            <p className="demo-note">Showing sample data for demonstration.</p>
          </div>
        )}

        {data.length > 0 ? (
          <Table data={data} isLoading={isLoading} />
        ) : isLoading ? (
          <div className="loading">Loading data...</div>
        ) : (
          <div className="no-data">No data available</div>
        )}
      </main>
    </div>
  );
};

// Sample data for demonstration - Sejaya CRIB Tool
const getSampleData = (): TableData[] => {
  return [
    {
      BatchIdentifier: 'BATCH-2024-001',
      ContractCode: 'CT-2024-001',
      ParentContractCode: 'CT-2023-098',
      ParentChildFlag: 'N',
      BranchID: 'BRN001',
      AccountNumber: 'ACC-2024-00001',
      PhaseOfCreditFacility: 'Disbursed',
      CreditFacilityStatus: 'Active',
      PreviousContractCode: 'CT-2022-055',
      PreviousSubscriberCode: 'SUB-2022-001',
      PreviousSourceCode: 'SRC-INTERNAL',
      PreviousBranchCode: 'BRN-OLD-001',
      CreditFacilityType: 'Term Loan',
      CreditFacilitySubtype: 'Vehicle Loan',
      CreditFacilitySubcategory: 'Two Wheeler',
      OwnershipIndicator: 'Individual',
      PrimaryCardLimit_Value: '500000',
      PrimaryCardLimit_Currency: 'LKR',
      PurposeOfCreditFacility: 'Vehicle Purchase',
      Currency: 'LKR',
      PackageLoanAmount_Value: '2500000',
      PackageLoanAmount_Currency: 'LKR',
      AmountGrantedLimit_Value: '2500000',
      AmountGrantedLimit_Currency: 'LKR',
      AmountWrittenOff_Value: '0',
      AmountWrittenOff_Currency: 'LKR',
      InstallmentAmount_Value: '50000',
      InstallmentAmount_Currency: 'LKR',
      NumberOfInstallments: '60',
      CurrentBalance_Value: '1850000',
      CurrentBalance_Currency: 'LKR',
      InterestOutstandingAmount_Value: '45000',
      InterestOutstandingAmount_Currency: 'LKR',
      AmountInArrears_Value: '0',
      AmountInArrears_Currency: 'LKR',
      NumberOfDaysInArrears: '0',
      DateOfLastPaymentReceived: '2024-05-01',
      RepaymentType: 'Monthly Installment',
      FirstDisbursementDate: '2023-05-15',
      CreditFacilityRestructuringDate: '2023-11-20',
      MaturityDate: '2028-05-15',
      CreditFacilityEndDate: '',
      WrittenOffTerminatedDate: '',
      LastAmountPaid_Value: '50000',
      LastAmountPaid_Currency: 'LKR',
      SecurityCoverage: 'Vehicle Mortgage',
      GuaranteeCoverage: 'Bank Guarantee',
      CustomerCode: 'CUST-001',
      Salutation: 'Mr.',
      FullName: 'Rohit Perera',
      Profession: 'Software Engineer',
      SpouseName: 'Nirmali Perera',
      ClassificationOfIndividual: 'Salaried',
      Gender: 'Male',
      DateOfBirth: '1985-03-15',
      MaritalStatus: 'Married',
      FateStatus: 'Living',
      Employment: 'Employed',
      Residency: 'Resident',
      EmployerName: 'Tech Solutions Ltd',
      BusinessName: '',
      NICNumber: '854321567V',
      PassportNumber: 'P123456789',
      DrivingLicenseNumber: 'DL-2020-001',
      PreviousNICNumber: '854321567V',
      BusinessRegistrationNumber: '',
      BusinessRegistrationDate: '',
      Mailing_City: 'Colombo',
      Mailing_PostalCode: '00600',
      Mailing_Province: 'Western',
      Mailing_District: 'Colombo',
      Mailing_Country: 'Sri Lanka',
      Mailing_AddressLine: '123 Galle Road, Colombo 6',
      Permanent_City: 'Colombo',
      Permanent_PostalCode: '00600',
      Permanent_Province: 'Western',
      Permanent_District: 'Colombo',
      Permanent_Country: 'Sri Lanka',
      Permanent_AddressLine: '123 Galle Road, Colombo 6',
      MobilePhone: '+94701234567',
      PhoneNumber: '+94112345678',
      PhoneNumber2: '+94112345679',
      Email: 'rohit.perera@email.com',
      MobileNumber2: '+94702234567',
      SubjectRole_CustomerCode: 'CUST-001',
      RoleOfCustomer: 'Primary Borrower',
      GuaranteeType: 'No Guarantee',
    },
    {
      BatchIdentifier: 'BATCH-2024-001',
      ContractCode: 'CT-2024-002',
      ParentContractCode: 'CT-2023-102',
      ParentChildFlag: 'Y',
      BranchID: 'BRN002',
      AccountNumber: 'ACC-2024-00002',
      PhaseOfCreditFacility: 'Disbursed',
      CreditFacilityStatus: 'Active',
      PreviousContractCode: 'CT-2023-045',
      PreviousSubscriberCode: 'SUB-2023-002',
      PreviousSourceCode: 'SRC-EXTERNAL',
      PreviousBranchCode: 'BRN-OLD-002',
      CreditFacilityType: 'Overdraft',
      CreditFacilitySubtype: 'Business Overdraft',
      CreditFacilitySubcategory: 'Import/Export',
      OwnershipIndicator: 'Business',
      PrimaryCardLimit_Value: '2000000',
      PrimaryCardLimit_Currency: 'LKR',
      PurposeOfCreditFacility: 'Working Capital',
      Currency: 'LKR',
      PackageLoanAmount_Value: '5000000',
      PackageLoanAmount_Currency: 'LKR',
      AmountGrantedLimit_Value: '5000000',
      AmountGrantedLimit_Currency: 'LKR',
      AmountWrittenOff_Value: '250000',
      AmountWrittenOff_Currency: 'LKR',
      InstallmentAmount_Value: '0',
      InstallmentAmount_Currency: 'LKR',
      NumberOfInstallments: 'As per agreement',
      CurrentBalance_Value: '3200000',
      CurrentBalance_Currency: 'LKR',
      InterestOutstandingAmount_Value: '125000',
      InterestOutstandingAmount_Currency: 'LKR',
      AmountInArrears_Value: '50000',
      AmountInArrears_Currency: 'LKR',
      NumberOfDaysInArrears: '15',
      DateOfLastPaymentReceived: '2024-04-28',
      RepaymentType: 'Quarterly',
      FirstDisbursementDate: '2024-01-10',
      CreditFacilityRestructuringDate: '2024-03-15',
      MaturityDate: '2025-01-10',
      CreditFacilityEndDate: '',
      WrittenOffTerminatedDate: '',
      LastAmountPaid_Value: '150000',
      LastAmountPaid_Currency: 'LKR',
      SecurityCoverage: 'Fixed Deposit',
      GuaranteeCoverage: 'Personal Guarantee',
      CustomerCode: 'CUST-002',
      Salutation: 'Ms.',
      FullName: 'Priya Jayawardene',
      Profession: 'Business Owner',
      SpouseName: 'Chaminda Jayawardene',
      ClassificationOfIndividual: 'Self Employed',
      Gender: 'Female',
      DateOfBirth: '1982-07-22',
      MaritalStatus: 'Married',
      FateStatus: 'Living',
      Employment: 'Self Employed',
      Residency: 'Resident',
      EmployerName: '',
      BusinessName: 'Priya Trading Company',
      NICNumber: '821567432V',
      PassportNumber: 'P987654321',
      DrivingLicenseNumber: 'DL-2018-045',
      PreviousNICNumber: '821567432V',
      BusinessRegistrationNumber: 'BR-2015-00234',
      BusinessRegistrationDate: '2015-06-01',
      Mailing_City: 'Negombo',
      Mailing_PostalCode: '11500',
      Mailing_Province: 'Western',
      Mailing_District: 'Gampaha',
      Mailing_Country: 'Sri Lanka',
      Mailing_AddressLine: '456 Main Street, Negombo',
      Permanent_City: 'Negombo',
      Permanent_PostalCode: '11500',
      Permanent_Province: 'Western',
      Permanent_District: 'Gampaha',
      Permanent_Country: 'Sri Lanka',
      Permanent_AddressLine: '456 Main Street, Negombo',
      MobilePhone: '+94702345678',
      PhoneNumber: '+94312345678',
      PhoneNumber2: '+94312345679',
      Email: 'priya.trading@email.com',
      MobileNumber2: '+94703456789',
      SubjectRole_CustomerCode: 'CUST-002',
      RoleOfCustomer: 'Primary Borrower',
      GuaranteeType: 'Co-Guarantor',
    },
    {
      BatchIdentifier: 'BATCH-2024-002',
      ContractCode: 'CT-2024-003',
      ParentContractCode: '',
      ParentChildFlag: 'N',
      BranchID: 'BRN003',
      AccountNumber: 'ACC-2024-00003',
      PhaseOfCreditFacility: 'Disbursed',
      CreditFacilityStatus: 'Closed',
      PreviousContractCode: 'CT-2019-001',
      PreviousSubscriberCode: 'SUB-2019-003',
      PreviousSourceCode: 'SRC-INTERNAL',
      PreviousBranchCode: 'BRN-OLD-003',
      CreditFacilityType: 'Mortgage',
      CreditFacilitySubtype: 'Home Mortgage',
      CreditFacilitySubcategory: 'Residential Property',
      OwnershipIndicator: 'Individual',
      PrimaryCardLimit_Value: '',
      PrimaryCardLimit_Currency: '',
      PurposeOfCreditFacility: 'Property Purchase',
      Currency: 'LKR',
      PackageLoanAmount_Value: '15000000',
      PackageLoanAmount_Currency: 'LKR',
      AmountGrantedLimit_Value: '15000000',
      AmountGrantedLimit_Currency: 'LKR',
      AmountWrittenOff_Value: '0',
      AmountWrittenOff_Currency: 'LKR',
      InstallmentAmount_Value: '125000',
      InstallmentAmount_Currency: 'LKR',
      NumberOfInstallments: '180',
      CurrentBalance_Value: '0',
      CurrentBalance_Currency: 'LKR',
      InterestOutstandingAmount_Value: '0',
      InterestOutstandingAmount_Currency: 'LKR',
      AmountInArrears_Value: '0',
      AmountInArrears_Currency: 'LKR',
      NumberOfDaysInArrears: '0',
      DateOfLastPaymentReceived: '2024-05-05',
      RepaymentType: 'Monthly',
      FirstDisbursementDate: '2015-06-01',
      CreditFacilityRestructuringDate: '2020-07-10',
      MaturityDate: '2030-06-01',
      CreditFacilityEndDate: '2024-04-15',
      WrittenOffTerminatedDate: '2024-04-16',
      LastAmountPaid_Value: '125000',
      LastAmountPaid_Currency: 'LKR',
      SecurityCoverage: 'Land & Building Mortgage',
      GuaranteeCoverage: 'Bank Guarantee',
      CustomerCode: 'CUST-003',
      Salutation: 'Mr.',
      FullName: 'Suresh Kumara',
      Profession: 'Manager',
      SpouseName: 'Anushka Kumara',
      ClassificationOfIndividual: 'Salaried',
      Gender: 'Male',
      DateOfBirth: '1975-11-08',
      MaritalStatus: 'Married',
      FateStatus: 'Living',
      Employment: 'Employed',
      Residency: 'Resident',
      EmployerName: 'National Bank',
      BusinessName: '',
      NICNumber: '754321098V',
      PassportNumber: 'P456789123',
      DrivingLicenseNumber: 'DL-2014-089',
      PreviousNICNumber: '754321098V',
      BusinessRegistrationNumber: '',
      BusinessRegistrationDate: '',
      Mailing_City: 'Kandy',
      Mailing_PostalCode: '20000',
      Mailing_Province: 'Central',
      Mailing_District: 'Kandy',
      Mailing_Country: 'Sri Lanka',
      Mailing_AddressLine: '789 Temple Road, Kandy',
      Permanent_City: 'Kandy',
      Permanent_PostalCode: '20000',
      Permanent_Province: 'Central',
      Permanent_District: 'Kandy',
      Permanent_Country: 'Sri Lanka',
      Permanent_AddressLine: '789 Temple Road, Kandy',
      MobilePhone: '+94704567890',
      PhoneNumber: '+94812345678',
      PhoneNumber2: '+94812345679',
      Email: 'suresh.kumara@email.com',
      MobileNumber2: '+94705567890',
      SubjectRole_CustomerCode: 'CUST-003',
      RoleOfCustomer: 'Primary Borrower',
      GuaranteeType: 'No Guarantee',
    },
  ];
};
