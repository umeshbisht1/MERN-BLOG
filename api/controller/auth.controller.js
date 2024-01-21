import  {User}  from "../model/user.model.js";
import bcryptjs from 'bcryptjs'
import { errorhandler } from "../utils/error.js";
export const signup=async(req,res,next)=>{
   const {email,username,password}=req.body;
   if(!username || !email || !password || username===''|| password===''||email==='')
   {
    next(errorhandler(400,"all field are required"))

   }
   const hashedpassword=bcryptjs.hashSync(password,10);
   try {
    const user= await User.create({email,username,password:hashedpassword});

    res.status(200).json({message:"user signup successfully",data:user});
   } catch (error) {
    next(error)
   }
   
  
}