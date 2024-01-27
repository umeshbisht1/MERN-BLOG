import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userrouter from './Routes/user.router.js'
import authroute from './Routes/auth.router.js'
import cookieParser from 'cookie-parser'
dotenv.config()

await mongoose.connect(process.env.MONGO_DB).then(()=>{
    console.log("mongo db is connected ");
}).catch((err)=>{
    console.log(err);
})
const app=express()
app.use(express.json())
app.use(cookieParser())
app.listen(3000,()=>{
    console.log(`Server is running at the port 3000`);
})
app.get("/",(req,res)=>{
    res.send("umesh bisht is here")
})
app.use("/api/user",userrouter);
app.use("/api/auth",authroute);
app.use((err,req,res,next)=>{
    const statuscode=err.statuscode||500;
    const message=err.message||"internal server error";
    res.status(statuscode).json({success:false,
    message,
    statuscode
    })
})
