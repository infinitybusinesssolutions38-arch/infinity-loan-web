(async()=>{
  try{
    const fs = require('fs');
    const url = 'http://localhost:3000/api/apply-now';
    const payload = { product: 'personal-loan', mobile: '9876543210', email: 'dbtest@example.com', pan: 'DBTEST1234F' };
    const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    const json = await res.json();
    console.log(JSON.stringify(json));
    if (json && json.applicationRef) {
      fs.writeFileSync('scripts/last_ref.txt', String(json.applicationRef));
    }
  } catch(e){
    console.error('ERR', e.message);
    process.exit(1);
  }
})();
