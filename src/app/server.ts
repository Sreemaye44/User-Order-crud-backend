import app from "./app";
import mongoose from 'mongoose';
import config from "./config";

async function main(){
   try{ 
    await mongoose.connect(config.database_url as string);
    app.listen(6000, () => {
      console.log(`Example app listening on port 6000`);
    });
}catch(error){
console.log(error)
}
}

main();

