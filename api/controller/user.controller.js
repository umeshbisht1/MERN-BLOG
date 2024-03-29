import { User } from "../model/user.model.js";
import { errorhandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";

export const test = (req, res) => {
  res.send("jai shri ram");
};
export const update = async (req, res, next) => {
  console.log(req.body);

  if (req.user._id !== req.params.id) {
    return next(errorhandler(403, "you rae not allowed to update the user"));
  }

  if (req.body.password) {
    if (req.body.password.length < 6)
      return next(errorhandler(400, "password must be at least 6 characcters"));
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }
  try {
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          profilePicture: req.body.profilePicture,
          password: req.body.password,
        },
      },
      { new: true } // This option returns the modified document rather than the original one
    );
    

    
    const { password, ...rest } = updateUser._doc;
    
    return res
      .status(200)
      .json({
        data: rest,
        message: "user updated successfully",
        statuscode: 200,
      });
  } catch (error) {
    next(error);
  }
};
export const deleteaccount=async(req,res,next)=>{
  if(req.user._id!==req.params.id)
  return next(errorhandler(403,"u are  not the valid user"));
  try {
    await User.findByIdAndDelete(req.user._id);
    return res.status(200).json({message:"user have beeen deleted successfully"});
  } catch (error) {
    next(err);
  }
}
export const signout=async(req,res,next)=>{
  console.log("umesh isngh  bisht");
  try {
      return  res.status(200).clearCookie('access_token').json({statuscode:200,message:"user signout sucessfully"});
  } catch (error) {
    return next(error.message)
  }
}
