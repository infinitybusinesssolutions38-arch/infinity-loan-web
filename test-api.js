const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
const fetch = require('node-fetch');

async function testSalariedApplication() {
  const form = new FormData();
  
  // Add form fields for salaried application
  form.append('loanType', 'salaried');
  form.append('firstName', 'Nitish');
  form.append('lastName', 'Bansal');
  form.append('dob', '1990-01-15');
  form.append('gender', 'Male');
  form.append('maritalStatus', 'Single');
  form.append('mobileNumber', '9876543210');
  form.append('whatsappNumber', '9876543210');
  form.append('alternateMobile', '9876543210');
  form.append('personalEmail', 'nitish.bansal@example.com');
  form.append('panNumber', 'ABCDE1234F');
  form.append('aadhaarNumber', '123456789012');
  form.append('voterIdNumber', '1234567890');
  form.append('currentResidentialAddress', '123 Main Street, Apartment 4, New Delhi');
  form.append('currentResidentialPincode', '110001');
  form.append('state', 'Delhi');
  form.append('city', 'New Delhi');
  form.append('residenceType', 'Rented');
  form.append('permanentAddress', '456 Old Street, Village, Haryana');
  form.append('companyName', 'Tech Corp India');
  form.append('designation', 'Senior Software Engineer');
  form.append('employmentType', 'Permanent Full-Time');
  form.append('dateOfJoining', '2020-06-01');
  form.append('totalExperienceYears', '8');
  form.append('officeLocation', 'Bangalore');
  form.append('officePincode', '560001');
  form.append('officialEmail', 'nitish@techcorp.com');
  form.append('monthlyNetSalary', '80000');
  form.append('salaryCreditMode', 'NEFT');
  form.append('salaryAccountBankName', 'HDFC Bank');
  form.append('numberOfExistingLoans', '0');
  form.append('existingLoansData', JSON.stringify([]));
  form.append('hasCibil', 'Yes');
  form.append('cibilScore', '750');
  form.append('requiredLoanAmount', '600000');
  form.append('preferredTenure', '36');
  form.append('purpose', 'Personal use');
  form.append('jobBusiness', 'Job');
  
  // Add required image files (create dummy files)
  const dummyImagePath = path.join(__dirname, 'dummy.jpg');
  const dummyPdfPath = path.join(__dirname, 'dummy.pdf');
  
  // Create dummy files if they don't exist
  if (!fs.existsSync(dummyImagePath)) {
    fs.writeFileSync(dummyImagePath, Buffer.from([0xFF, 0xD8, 0xFF, 0xE0])); // JPEG header
  }
  if (!fs.existsSync(dummyPdfPath)) {
    fs.writeFileSync(dummyPdfPath, Buffer.from([0x25, 0x50, 0x44, 0x46])); // PDF header
  }
  
  form.append('panPhoto', fs.createReadStream(dummyImagePath));
  form.append('aadhaarPhoto', fs.createReadStream(dummyImagePath));
  form.append('aadhaarBackPhoto', fs.createReadStream(dummyImagePath));
  form.append('applicantPhoto', fs.createReadStream(dummyImagePath));
  
  try {
    const response = await fetch('http://localhost:3001/api/apply-now', {
      method: 'POST',
      body: form,
      headers: form.getHeaders(),
    });
    
    const data = await response.json();
    console.log('Status:', response.status);
    console.log('Response:', JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Request error:', error.message);
  }
}

testSalariedApplication();
