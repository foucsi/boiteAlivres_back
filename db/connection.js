const mongoose = require("mongoose");
const connectionString = process.env.CONNECTION_STRING;

const connectDb = async ()=>{
    try{
        await mongoose.connect(connectionString, {connectTimeoutMS: 2000});
        console.log("Database app boiteAlivres connected");
    }catch(error){
        console.error(error);
    }
}
connectDb();