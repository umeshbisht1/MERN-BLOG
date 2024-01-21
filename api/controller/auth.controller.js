import  {User}  from "../model/user.model.js";
import bcryptjs from 'bcryptjs'
export const signup=async(req,res)=>{
   const {email,username,password}=req.body;
   if(!username || !email || !password || username===''|| password===''||email==='')
   {
    res.status(400).json({message:"all feild are required"})

   }
   const hashedpassword=bcryptjs.hashSync(password,10);
   try {
    const user= await User.create({email,username,password:hashedpassword});

    res.status(500).json({message:"user signup successfully",data:user});
   } catch (error) {
    res.status(500).json({message:"error occured"});
   }
   
  
}