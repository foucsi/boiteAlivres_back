const mongoose = require("mongoose");
const connectionString = process.env.CONNECTION_STRING;

const connectDb = async ()=>{
    try{
        await mongoose.connect(connectionString, {connectTimeoutMS: 2000});
        console.log("Successfully connected to the database: boiteAlivres");
    }catch(error){
        console.error(error);
    }
}
connectDb();