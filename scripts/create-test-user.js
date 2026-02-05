const mongoose = require('mongoose');
const fs = require('fs');
const PersonalLoanModel = require('../src/app/api/models/personal-loan-schema');

(async () => {
  try {
    // Read .env file
    const env = fs.readFileSync('.env', 'utf8');
    const match = env.match(/CONNECTIONSTRING\s*=\s*(.*)/);
    const uri = match ? match[1].trim().replace(/^"|"$/g, '') : process.env.CONNECTIONSTRING;
    
    if (!uri) {
      throw new Error('CONNECTIONSTRING not found in .env');
    }
    
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('Connected to MongoDB');
    
    // Check for existing user
    const user = await PersonalLoanModel.findOne({ email: 'test@example.com' });
    if (user) {
      console.log('User found:', user.email);
    } else {
      console.log('No user found with test@example.com');
      
      // Create a test user
      console.log('Creating test user...');
      const newUser = new PersonalLoanModel({
        email: 'test@example.com',
        firstname: 'Test',
        lastname: 'User',
        mobile: '1234567890',
        pan: 'TESTPAN123',
        role: 'borrower-personal',
      });
      
      await newUser.save();
      console.log('Test user created successfully');
    }
    
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
})();
