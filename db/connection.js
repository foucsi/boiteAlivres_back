const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");

const connectionString = process.env.CONNECTION_STRING;

const connectDb = asyncHandler( async ()=>{
        await mongoose.connect(connectionString, {connectTimeoutMS: 2000});
        console.log("Database app boiteAlivres connected");
})

connectDb()