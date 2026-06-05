const fs=require("fs");const path=require("path");const mongoose=require("mongoose");
const envPath=path.join(__dirname,"..",".env");
for(const line of fs.readFileSync(envPath,"utf8").split(/\r?\n/)){const t=line.trim();if(!t||t[0]==="#")continue;const i=t.indexOf("=");if(i<0)continue;process.env[t.slice(0,i).trim()]=t.slice(i+1).trim();}
const uri=String(process.env.CONNECTIONSTRING||"").trim();
mongoose.connect(uri,{serverSelectionTimeoutMS:20000}).then(async()=>{console.log("OK connected",mongoose.connection.name);const cols=await mongoose.connection.db.listCollections().toArray();console.log("collections",cols.length);await mongoose.disconnect();}).catch(e=>{console.error("FAIL",e.message);process.exit(1);});