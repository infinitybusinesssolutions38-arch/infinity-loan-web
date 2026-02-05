(async()=>{
  try{
    const fs = require('fs');
    const mongoose = require('mongoose');
    const env = fs.readFileSync('.env','utf8');
    const m = env.match(/CONNECTIONSTRING\s*=\s*(.*)/);
    if(!m){ console.error('CONNECTIONSTRING not found'); process.exit(2); }
    const uri = m[1].trim().replace(/^"|"$/g,'');
    await mongoose.connect(uri, { useNewUrlParser:true, useUnifiedTopology:true });
    const db = mongoose.connection.db;
    const ref = process.argv[2] || '847552';
    const cols = await db.listCollections().toArray();
    let found=false;
    for(const c of cols){
      const doc = await db.collection(c.name).findOne({applicationRef:ref});
      if(doc){ console.log('FOUND in', c.name, JSON.stringify(doc)); found=true; break; }
    }
    if(!found) console.log('Not found in DB');
    await mongoose.disconnect();
  } catch(e){
    console.error('ERR', e.message);
    process.exit(1);
  }
})();
