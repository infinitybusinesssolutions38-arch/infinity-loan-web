const axios = require('axios');

(async () => {
  try {
    console.log('[1] Sending OTP to test@example.com...');
    const otpRes = await axios.post('http://localhost:3000/api/send-otp', { 
      email: 'test@example.com' 
    });
    
    const otp = otpRes.data.otp;
    console.log('[2] OTP generated:', otp);
    console.log('[3] OTP Response:', otpRes.data);
    
    // Wait a moment for the OTP to be stored
    await new Promise(r => setTimeout(r, 500));
    
    console.log('[4] Attempting login with OTP...');
    const loginRes = await axios.post('http://localhost:3000/api/login', { 
      email: 'test@example.com', 
      otp: otp 
    });
    
    console.log('[5] Login successful!');
    console.log('[6] Login Response:', loginRes.data);
    console.log('[7] Token received:', loginRes.data.token ? 'YES' : 'NO');
  } catch (error) {
    console.error('[ERROR]', error.response?.data || error.message);
    process.exit(1);
  }
})();
