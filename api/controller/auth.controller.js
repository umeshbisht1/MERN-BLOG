import  {User}  from "../model/user.model.js";
import bcryptjs from 'bcryptjs'
import { errorhandler } from "../utils/error.js";
import jwt from 'jsonwebtoken'
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
export const signin=async(req,res,next)=>{
   const {email,password}=req.body;
   console.log(req.body);
   if(!email || !password ||email===''|| password==='')
   next(errorhandler(400,"all feild are required"));
  try {
    const user=await User.findOne({email});
    if(!user)
    {
      return next(errorhandler(404,"user not found"));
    }
    const validPassword= bcryptjs.compareSync(password,user.password);
  if(!validPassword)
  {
   return next(errorhandler(404,"email or password is not valid"));
  }
  const token=jwt.sign(
   {
      _id:user._id,
   },
   process.env.TOKEN_SECRET
   )
   const {password:pass,...rest}=user._doc
   
   res.status(200).cookie('access-token',token,{
      httpOnly:true
   }).json({ data:rest,message:"user signin successfully"})
  } catch (error) {
   next(error)
  }
}