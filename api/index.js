import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
await mongoose.connect(process.env.MONGO_DB).then(()=>{
    console.log("mongo db is connected ");
}).catch((err)=>{
    console.log(err);
})
const app=express()
app.listen(3000,()=>{
    console.log(`Server is running at the port 3000`);
})