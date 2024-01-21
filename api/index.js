import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userrouter from './Routes/user.router.js'
import authroute from './Routes/auth.router.js'
dotenv.config()

await mongoose.connect(process.env.MONGO_DB).then(()=>{
    console.log("mongo db is connected ");
}).catch((err)=>{
    console.log(err);
})
const app=express()
app.use(express.json())
app.listen(3000,()=>{
    console.log(`Server is running at the port 3000`);
})
app.get("/",(req,res)=>{
    res.send("umesh bisht is here")
})
app.use("/api/user",userrouter);
app.use("/api/auth",authroute);
