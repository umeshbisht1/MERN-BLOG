import mongoose from "mongoose";
import { Schema } from "mongoose";
const userschema=new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    },
},{timestamps:true});
export const User=mongoose.model("User",userschema)