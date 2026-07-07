export const parseXMLToTableData = (xmlString) => {
  try {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, 'text/xml');

    if (xmlDoc.getElementsByTagName('parsererror').length > 0) {
      console.error('XML parsing error');
      return [];
    }

    const data = [];
    const batches = xmlDoc.querySelectorAll('Batch');

    batches.forEach((batch) => {
      const batchIdentifier = getElementText(batch, 'BatchIdentifier');
      const contracts = batch.querySelectorAll('Contract');

      contracts.forEach((contract) => {
        const row = flattenBatchContractData(batchIdentifier, contract);
        data.push(row);
      });
    });

    return data;
  } catch (error) {
    console.error('Error parsing XML:', error);
    return [];
  }
};

const flattenBatchContractData = (batchIdentifier, contractElement) => {
  const row = {};

  row.BatchIdentifier = batchIdentifier;
  row.ContractCode = getElementText(contractElement, 'ContractCode');

  const contractData = contractElement.querySelector('ContractData');
  if (contractData) {
    row.ParentContractCode = getElementText(contractData, 'ParentContractCode');
    row.ParentChildFlag = getElementText(contractData, 'ParentChildFlag');
    row.BranchID = getElementText(contractData, 'BranchID');
    row.AccountNumber = getElementText(contractData, 'AccountNumber');
    row.PhaseOfCreditFacility = getElementText(contractData, 'PhaseOfCreditFacility');
    row.CreditFacilityStatus = getElementText(contractData, 'CreditFacilityStatus');
    row.PreviousContractCode = getElementText(contractData, 'PreviousContractCode');

    const previousEntityInfo = contractData.querySelector('PreviousEntityInfo');
    if (previousEntityInfo) {
      row.PreviousSubscriberCode = getElementText(previousEntityInfo, 'PreviousSubscriberCode');
      row.PreviousSourceCode = getElementText(previousEntityInfo, 'PreviousSourceCode');
      row.PreviousBranchCode = getElementText(previousEntityInfo, 'PreviousBranchCode');
    }

    row.CreditFacilityType = getElementText(contractData, 'CreditFacilityType');
    row.CreditFacilitySubtype = getElementText(contractData, 'CreditFacilitySubtype');
    row.CreditFacilitySubcategory = getElementText(contractData, 'CreditFacilitySubcategory');
    row.OwnershipIndicator = getElementText(contractData, 'OwnershipIndicator');

    const primaryCardLimit = contractData.querySelector('PrimaryCardLimit');
    if (primaryCardLimit) {
      row.PrimaryCardLimit_Value = getElementText(primaryCardLimit, 'Value');
      row.PrimaryCardLimit_Currency = getElementText(primaryCardLimit, 'Currency');
    }

    row.PurposeOfCreditFacility = getElementText(contractData, 'PurposeOfCreditFacility');
    row.Currency = getElementText(contractData, 'Currency');

    const packageLoanAmount = contractData.querySelector('PackageLoanAmount');
    if (packageLoanAmount) {
      row.PackageLoanAmount_Value = getElementText(packageLoanAmount, 'Value');
      row.PackageLoanAmount_Currency = getElementText(packageLoanAmount, 'Currency');
    }

    const amountGranted = contractData.querySelector('AmountGrantedLimit');
    if (amountGranted) {
      row.AmountGrantedLimit_Value = getElementText(amountGranted, 'Value');
      row.AmountGrantedLimit_Currency = getElementText(amountGranted, 'Currency');
    }

    const amountWrittenOff = contractData.querySelector('AmountWrittenOff');
    if (amountWrittenOff) {
      row.AmountWrittenOff_Value = getElementText(amountWrittenOff, 'Value');
      row.AmountWrittenOff_Currency = getElementText(amountWrittenOff, 'Currency');
    }

    const installmentAmount = contractData.querySelector('InstallmentAmount');
    if (installmentAmount) {
      row.InstallmentAmount_Value = getElementText(installmentAmount, 'Value');
      row.InstallmentAmount_Currency = getElementText(installmentAmount, 'Currency');
    }

    row.NumberOfInstallments = getElementText(contractData, 'NumberOfInstallments');

    const currentBalance = contractData.querySelector('CurrentBalance');
    if (currentBalance) {
      row.CurrentBalance_Value = getElementText(currentBalance, 'Value');
      row.CurrentBalance_Currency = getElementText(currentBalance, 'Currency');
    }

    const interestOutstanding = contractData.querySelector('InterestOutstandingAmount');
    if (interestOutstanding) {
      row.InterestOutstandingAmount_Value = getElementText(interestOutstanding, 'Value');
      row.InterestOutstandingAmount_Currency = getElementText(interestOutstanding, 'Currency');
    }

    const amountInArrears = contractData.querySelector('AmountInArrears');
    if (amountInArrears) {
      row.AmountInArrears_Value = getElementText(amountInArrears, 'Value');
      row.AmountInArrears_Currency = getElementText(amountInArrears, 'Currency');
    }

    row.NumberOfDaysInArrears = getElementText(contractData, 'NumberOfDaysInArrears');
    row.DateOfLastPaymentReceived = getElementText(contractData, 'DateOfLastPaymentReceived');
    row.RepaymentType = getElementText(contractData, 'RepaymentType');
    row.FirstDisbursementDate = getElementText(contractData, 'FirstDisbursementDate');
    row.CreditFacilityRestructuringDate = getElementText(contractData, 'CreditFacilityRestructuringDate');
    row.MaturityDate = getElementText(contractData, 'MaturityDate');
    row.CreditFacilityEndDate = getElementText(contractData, 'CreditFacilityEndDate');
    row.WrittenOffTerminatedDate = getElementText(contractData, 'WrittenOffTerminatedDate');

    const lastAmountPaid = contractData.querySelector('LastAmountPaid');
    if (lastAmountPaid) {
      row.LastAmountPaid_Value = getElementText(lastAmountPaid, 'Value');
      row.LastAmountPaid_Currency = getElementText(lastAmountPaid, 'Currency');
    }

    row.SecurityCoverage = getElementText(contractData, 'SecurityCoverage');
    row.GuaranteeCoverage = getElementText(contractData, 'GuaranteeCoverage');
  }

  const individual = contractElement.querySelector('Individual');
  if (individual) {
    row.CustomerCode = getElementText(individual, 'CustomerCode');
    row.Salutation = getElementText(individual, 'Salutation');
    row.FullName = getElementText(individual, 'FullName');
    row.Profession = getElementText(individual, 'Profession');
    row.SpouseName = getElementText(individual, 'SpouseName');
    row.ClassificationOfIndividual = getElementText(individual, 'ClassificationOfIndividual');
    row.Gender = getElementText(individual, 'Gender');
    row.DateOfBirth = getElementText(individual, 'DateOfBirth');
    row.MaritalStatus = getElementText(individual, 'MaritalStatus');
    row.FateStatus = getElementText(individual, 'FateStatus');
    row.Employment = getElementText(individual, 'Employment');
    row.Residency = getElementText(individual, 'Residency');
    row.EmployerName = getElementText(individual, 'EmployerName');
    row.BusinessName = getElementText(individual, 'BusinessName');

    const identificationNumbers = individual.querySelector('IdentificationNumbers');
    if (identificationNumbers) {
      row.NICNumber = getElementText(identificationNumbers, 'NICNumber');
      row.PassportNumber = getElementText(identificationNumbers, 'PassportNumber');
      row.DrivingLicenseNumber = getElementText(identificationNumbers, 'DrivingLicenseNumber');
      row.PreviousNICNumber = getElementText(identificationNumbers, 'PreviousNICNumber');
      row.BusinessRegistrationNumber = getElementText(identificationNumbers, 'BusinessRegistrationNumber');
      row.BusinessRegistrationDate = getElementText(identificationNumbers, 'BusinessRegistrationDate');
    }

    const mailingAddress = individual.querySelector('MailingAddress');
    if (mailingAddress) {
      row.Mailing_City = getElementText(mailingAddress, 'City');
      row.Mailing_PostalCode = getElementText(mailingAddress, 'PostalCode');
      row.Mailing_Province = getElementText(mailingAddress, 'Province');
      row.Mailing_District = getElementText(mailingAddress, 'District');
      row.Mailing_Country = getElementText(mailingAddress, 'Country');
      row.Mailing_AddressLine = getElementText(mailingAddress, 'AddressLine');
    }

    const permanentAddress = individual.querySelector('PermanentAddress');
    if (permanentAddress) {
      row.Permanent_City = getElementText(permanentAddress, 'City');
      row.Permanent_PostalCode = getElementText(permanentAddress, 'PostalCode');
      row.Permanent_Province = getElementText(permanentAddress, 'Province');
      row.Permanent_District = getElementText(permanentAddress, 'District');
      row.Permanent_Country = getElementText(permanentAddress, 'Country');
      row.Permanent_AddressLine = getElementText(permanentAddress, 'AddressLine');
    }

    const contacts = individual.querySelector('Contacts');
    if (contacts) {
      row.MobilePhone = getElementText(contacts, 'MobilePhone');
      row.PhoneNumber = getElementText(contacts, 'PhoneNumber');
      row.PhoneNumber2 = getElementText(contacts, 'PhoneNumber2');
      row.Email = getElementText(contacts, 'Email');
      row.MobileNumber2 = getElementText(contacts, 'MobileNumber2');
    }
  }

  const subjectRole = contractElement.querySelector('SubjectRole');
  if (subjectRole) {
    row.SubjectRole_CustomerCode = getElementText(subjectRole, 'CustomerCode');
    row.RoleOfCustomer = getElementText(subjectRole, 'RoleOfCustomer');
    row.GuaranteeType = getElementText(subjectRole, 'GuaranteeType');
  }

  return row;
};

const getElementText = (parent, tagName) => {
  const element = parent.querySelector(tagName);
  return element ? (element.textContent?.trim() || '') : '';
};

export const convertToXML = (data) => {
  if (!data || data.length === 0) {
    return `<?xml version="1.0" encoding="UTF-8"?>
<Batch
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns="http://creditinfo.com/schemas/CB5/SriLanka/contract"
    xsi:schemaLocation="http://creditinfo.com/schemas/CB5/SriLanka/contract ContractFull.xsd">
</Batch>`;
  }

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<Batch
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns="http://creditinfo.com/schemas/CB5/SriLanka/contract"
    xsi:schemaLocation="http://creditinfo.com/schemas/CB5/SriLanka/contract ContractFull.xsd">
`;

  const batchIdentifier = data[0].BatchIdentifier || '';
  xml += `    <BatchIdentifier>${escapeXML(String(batchIdentifier))}</BatchIdentifier>\n`;

  data.forEach((row) => {
    xml += '    <Contract>\n';
    xml += `        <ContractCode>${escapeXML(String(row.ContractCode ?? ''))}</ContractCode>\n`;
    xml += '        <ContractData>\n';
    xml += `            <ParentContractCode>${escapeXML(String(row.ParentContractCode ?? ''))}</ParentContractCode>\n`;
    xml += `            <ParentChildFlag>${escapeXML(String(row.ParentChildFlag ?? ''))}</ParentChildFlag>\n`;
    xml += `            <BranchID>${escapeXML(String(row.BranchID ?? ''))}</BranchID>\n`;
    xml += `            <AccountNumber>${escapeXML(String(row.AccountNumber ?? ''))}</AccountNumber>\n`;
    xml += `            <PhaseOfCreditFacility>${escapeXML(String(row.PhaseOfCreditFacility ?? ''))}</PhaseOfCreditFacility>\n`;
    xml += `            <CreditFacilityStatus>${escapeXML(String(row.CreditFacilityStatus ?? ''))}</CreditFacilityStatus>\n`;
    xml += `            <PreviousContractCode>${escapeXML(String(row.PreviousContractCode ?? ''))}</PreviousContractCode>\n`;
    xml += '            <PreviousEntityInfo>\n';
    xml += `                <PreviousSubscriberCode>${escapeXML(String(row.PreviousSubscriberCode ?? ''))}</PreviousSubscriberCode>\n`;
    xml += `                <PreviousSourceCode>${escapeXML(String(row.PreviousSourceCode ?? ''))}</PreviousSourceCode>\n`;
    xml += `                <PreviousBranchCode>${escapeXML(String(row.PreviousBranchCode ?? ''))}</PreviousBranchCode>\n`;
    xml += '            </PreviousEntityInfo>\n';
    xml += `            <CreditFacilityType>${escapeXML(String(row.CreditFacilityType ?? ''))}</CreditFacilityType>\n`;
    xml += `            <CreditFacilitySubtype>${escapeXML(String(row.CreditFacilitySubtype ?? ''))}</CreditFacilitySubtype>\n`;
    xml += `            <CreditFacilitySubcategory>${escapeXML(String(row.CreditFacilitySubcategory ?? ''))}</CreditFacilitySubcategory>\n`;
    xml += `            <OwnershipIndicator>${escapeXML(String(row.OwnershipIndicator ?? ''))}</OwnershipIndicator>\n`;
    xml += '            <PrimaryCardLimit>\n';
    xml += `                <Value>${escapeXML(String(row.PrimaryCardLimit_Value ?? ''))}</Value>\n`;
    xml += `                <Currency>${escapeXML(String(row.PrimaryCardLimit_Currency ?? ''))}</Currency>\n`;
    xml += '            </PrimaryCardLimit>\n';
    xml += `            <PurposeOfCreditFacility>${escapeXML(String(row.PurposeOfCreditFacility ?? ''))}</PurposeOfCreditFacility>\n`;
    xml += `            <Currency>${escapeXML(String(row.Currency ?? ''))}</Currency>\n`;
    xml += '            <PackageLoanAmount>\n';
    xml += `                <Value>${escapeXML(String(row.PackageLoanAmount_Value ?? ''))}</Value>\n`;
    xml += `                <Currency>${escapeXML(String(row.PackageLoanAmount_Currency ?? ''))}</Currency>\n`;
    xml += '            </PackageLoanAmount>\n';
    xml += '            <AmountGrantedLimit>\n';
    xml += `                <Value>${escapeXML(String(row.AmountGrantedLimit_Value ?? ''))}</Value>\n`;
    xml += `                <Currency>${escapeXML(String(row.AmountGrantedLimit_Currency ?? ''))}</Currency>\n`;
    xml += '            </AmountGrantedLimit>\n';
    xml += '            <AmountWrittenOff>\n';
    xml += `                <Value>${escapeXML(String(row.AmountWrittenOff_Value ?? ''))}</Value>\n`;
    xml += `                <Currency>${escapeXML(String(row.AmountWrittenOff_Currency ?? ''))}</Currency>\n`;
    xml += '            </AmountWrittenOff>\n';
    xml += '            <InstallmentAmount>\n';
    xml += `                <Value>${escapeXML(String(row.InstallmentAmount_Value ?? ''))}</Value>\n`;
    xml += `                <Currency>${escapeXML(String(row.InstallmentAmount_Currency ?? ''))}</Currency>\n`;
    xml += '            </InstallmentAmount>\n';
    xml += `            <NumberOfInstallments>${escapeXML(String(row.NumberOfInstallments ?? ''))}</NumberOfInstallments>\n`;
    xml += '            <CurrentBalance>\n';
    xml += `                <Value>${escapeXML(String(row.CurrentBalance_Value ?? ''))}</Value>\n`;
    xml += `                <Currency>${escapeXML(String(row.CurrentBalance_Currency ?? ''))}</Currency>\n`;
    xml += '            </CurrentBalance>\n';
    xml += '            <InterestOutstandingAmount>\n';
    xml += `                <Value>${escapeXML(String(row.InterestOutstandingAmount_Value ?? ''))}</Value>\n`;
    xml += `                <Currency>${escapeXML(String(row.InterestOutstandingAmount_Currency ?? ''))}</Currency>\n`;
    xml += '            </InterestOutstandingAmount>\n';
    xml += '            <AmountInArrears>\n';
    xml += `                <Value>${escapeXML(String(row.AmountInArrears_Value ?? ''))}</Value>\n`;
    xml += `                <Currency>${escapeXML(String(row.AmountInArrears_Currency ?? ''))}</Currency>\n`;
    xml += '            </AmountInArrears>\n';
    xml += `            <NumberOfDaysInArrears>${escapeXML(String(row.NumberOfDaysInArrears ?? ''))}</NumberOfDaysInArrears>\n`;
    xml += `            <DateOfLastPaymentReceived>${escapeXML(String(row.DateOfLastPaymentReceived ?? ''))}</DateOfLastPaymentReceived>\n`;
    xml += `            <RepaymentType>${escapeXML(String(row.RepaymentType ?? ''))}</RepaymentType>\n`;
    xml += `            <FirstDisbursementDate>${escapeXML(String(row.FirstDisbursementDate ?? ''))}</FirstDisbursementDate>\n`;
    xml += `            <CreditFacilityRestructuringDate>${escapeXML(String(row.CreditFacilityRestructuringDate ?? ''))}</CreditFacilityRestructuringDate>\n`;
    xml += `            <MaturityDate>${escapeXML(String(row.MaturityDate ?? ''))}</MaturityDate>\n`;
    xml += `            <CreditFacilityEndDate>${escapeXML(String(row.CreditFacilityEndDate ?? ''))}</CreditFacilityEndDate>\n`;
    xml += `            <WrittenOffTerminatedDate>${escapeXML(String(row.WrittenOffTerminatedDate ?? ''))}</WrittenOffTerminatedDate>\n`;
    xml += '            <LastAmountPaid>\n';
    xml += `                <Value>${escapeXML(String(row.LastAmountPaid_Value ?? ''))}</Value>\n`;
    xml += `                <Currency>${escapeXML(String(row.LastAmountPaid_Currency ?? ''))}</Currency>\n`;
    xml += '            </LastAmountPaid>\n';
    xml += `            <SecurityCoverage>${escapeXML(String(row.SecurityCoverage ?? ''))}</SecurityCoverage>\n`;
    xml += `            <GuaranteeCoverage>${escapeXML(String(row.GuaranteeCoverage ?? ''))}</GuaranteeCoverage>\n`;
    xml += '        </ContractData>\n';
    xml += '        <Individual>\n';
    xml += `            <CustomerCode>${escapeXML(String(row.CustomerCode ?? ''))}</CustomerCode>\n`;
    xml += `            <Salutation>${escapeXML(String(row.Salutation ?? ''))}</Salutation>\n`;
    xml += `            <FullName>${escapeXML(String(row.FullName ?? ''))}</FullName>\n`;
    xml += `            <Profession>${escapeXML(String(row.Profession ?? ''))}</Profession>\n`;
    xml += `            <SpouseName>${escapeXML(String(row.SpouseName ?? ''))}</SpouseName>\n`;
    xml += `            <ClassificationOfIndividual>${escapeXML(String(row.ClassificationOfIndividual ?? ''))}</ClassificationOfIndividual>\n`;
    xml += `            <Gender>${escapeXML(String(row.Gender ?? ''))}</Gender>\n`;
    xml += `            <DateOfBirth>${escapeXML(String(row.DateOfBirth ?? ''))}</DateOfBirth>\n`;
    xml += `            <MaritalStatus>${escapeXML(String(row.MaritalStatus ?? ''))}</MaritalStatus>\n`;
    xml += `            <FateStatus>${escapeXML(String(row.FateStatus ?? ''))}</FateStatus>\n`;
    xml += `            <Employment>${escapeXML(String(row.Employment ?? ''))}</Employment>\n`;
    xml += `            <Residency>${escapeXML(String(row.Residency ?? ''))}</Residency>\n`;
    xml += `            <EmployerName>${escapeXML(String(row.EmployerName ?? ''))}</EmployerName>\n`;
    xml += `            <BusinessName>${escapeXML(String(row.BusinessName ?? ''))}</BusinessName>\n`;
    xml += '            <IdentificationNumbers>\n';
    xml += `                <NICNumber>${escapeXML(String(row.NICNumber ?? ''))}</NICNumber>\n`;
    xml += `                <PassportNumber>${escapeXML(String(row.PassportNumber ?? ''))}</PassportNumber>\n`;
    xml += `                <DrivingLicenseNumber>${escapeXML(String(row.DrivingLicenseNumber ?? ''))}</DrivingLicenseNumber>\n`;
    xml += `                <PreviousNICNumber>${escapeXML(String(row.PreviousNICNumber ?? ''))}</PreviousNICNumber>\n`;
    xml += `                <BusinessRegistrationNumber>${escapeXML(String(row.BusinessRegistrationNumber ?? ''))}</BusinessRegistrationNumber>\n`;
    xml += `                <BusinessRegistrationDate>${escapeXML(String(row.BusinessRegistrationDate ?? ''))}</BusinessRegistrationDate>\n`;
    xml += '            </IdentificationNumbers>\n';
    xml += '            <MailingAddress>\n';
    xml += `                <City>${escapeXML(String(row.Mailing_City ?? ''))}</City>\n`;
    xml += `                <PostalCode>${escapeXML(String(row.Mailing_PostalCode ?? ''))}</PostalCode>\n`;
    xml += `                <Province>${escapeXML(String(row.Mailing_Province ?? ''))}</Province>\n`;
    xml += `                <District>${escapeXML(String(row.Mailing_District ?? ''))}</District>\n`;
    xml += `                <Country>${escapeXML(String(row.Mailing_Country ?? ''))}</Country>\n`;
    xml += `                <AddressLine>${escapeXML(String(row.Mailing_AddressLine ?? ''))}</AddressLine>\n`;
    xml += '            </MailingAddress>\n';
    xml += '            <PermanentAddress>\n';
    xml += `                <City>${escapeXML(String(row.Permanent_City ?? ''))}</City>\n`;
    xml += `                <PostalCode>${escapeXML(String(row.Permanent_PostalCode ?? ''))}</PostalCode>\n`;
    xml += `                <Province>${escapeXML(String(row.Permanent_Province ?? ''))}</Province>\n`;
    xml += `                <District>${escapeXML(String(row.Permanent_District ?? ''))}</District>\n`;
    xml += `                <Country>${escapeXML(String(row.Permanent_Country ?? ''))}</Country>\n`;
    xml += `                <AddressLine>${escapeXML(String(row.Permanent_AddressLine ?? ''))}</AddressLine>\n`;
    xml += '            </PermanentAddress>\n';
    xml += '            <Contacts>\n';
    xml += `                <MobilePhone>${escapeXML(String(row.MobilePhone ?? ''))}</MobilePhone>\n`;
    xml += `                <PhoneNumber>${escapeXML(String(row.PhoneNumber ?? ''))}</PhoneNumber>\n`;
    xml += `                <PhoneNumber2>${escapeXML(String(row.PhoneNumber2 ?? ''))}</PhoneNumber2>\n`;
    xml += `                <Email>${escapeXML(String(row.Email ?? ''))}</Email>\n`;
    xml += `                <MobileNumber2>${escapeXML(String(row.MobileNumber2 ?? ''))}</MobileNumber2>\n`;
    xml += '            </Contacts>\n';
    xml += '        </Individual>\n';
    xml += '        <SubjectRole>\n';
    xml += `            <CustomerCode>${escapeXML(String(row.SubjectRole_CustomerCode ?? ''))}</CustomerCode>\n`;
    xml += `            <RoleOfCustomer>${escapeXML(String(row.RoleOfCustomer ?? ''))}</RoleOfCustomer>\n`;
    xml += `            <GuaranteeType>${escapeXML(String(row.GuaranteeType ?? ''))}</GuaranteeType>\n`;
    xml += '        </SubjectRole>\n';
    xml += '    </Contract>\n';
  });

  xml += '</Batch>';
  return xml;
};

const escapeXML = (str) => {
  const xmlChar = {
    '<': '&lt;',
    '>': '&gt;',
    '&': '&amp;',
    '"': '&quot;',
    "'": '&apos;',
  };

  return str.replace(/[<>&"']/g, (char) => xmlChar[char] || char);
};

export const downloadXML = (xmlContent, fileName = 'data.xml') => {
  const element = document.createElement('a');
  const file = new Blob([xmlContent], { type: 'application/xml' });
  element.href = URL.createObjectURL(file);
  element.download = fileName;
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
  URL.revokeObjectURL(element.href);
};

export const downloadTableAsXML = (data, fileName = 'table_data.xml') => {
  const xmlContent = convertToXML(data);
  downloadXML(xmlContent, fileName);
};