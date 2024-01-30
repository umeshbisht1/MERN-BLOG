import mongoose from 'mongoose'
import { Schema } from 'mongoose'
const postschema=new Schema({
   userId:{
    type:String,
    required:true
   },
   title:{
    type:String,
    required:true,
    unique:true,
    
   },
   image:{
    type:String,
    default:"https://media.istockphoto.com/id/1326409389/vector/new-blog-post-origami-style-speech-bubble-banner-sticker-design-template-with-new-blog-post.jpg?s=612x612&w=0&k=20&c=s9FKf7LkahjhvHLfTvtRBMCe_vso8TrH3BO-9e2QrIY="
   },
   category:{
    type:String,
    default:"uncategorized",
    unique:true
   },
   slug:{
     type:String,
     required:true,
     unique:true,
   }
},{timestamps:true});
export const Post=mongoose.model("Post",postschema)