import { Post } from "../model/Post.model.js";
import { errorhandler } from "../utils/error.js"

export const create=async(req,res,next)=>{
    
    if(req.user.isAdmin==false)
    {
        return next(errorhandler(403,"you are not allowed to create apost"));
    }
    if(!req.body.title||!req.body.content)
    {
        return next(errorhandler(400,"please fill all the feilds"))
    }
    const slug=req.body.title.split(' ').join("-").toLowerCase().replace(/[^a-zA-Z0-9-]/g,'-');
   
    try {
        const newpost=await Post.create({
            ...req.body,
            slug,
            userId:req.user._id
        })
        return res.status(200).json({statuscode:200,message:"post have been created successfully",data:newpost});
    } catch (error) {
        next(errorhandler(403,`error occured in createing the new post${error.message}`));
    }

}