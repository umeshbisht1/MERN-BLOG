import jwt from "jsonwebtoken";
import { errorhandler } from "./error.js";
export const verfiyuser = async (req, res, next) => {
  const {access_token} = req.cookies;
  
  if (!access_token) return next(errorhandler(401, "Unauthorized"));
  jwt.verify(access_token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) {
      return next(errorhandler(401, "Unauthorized"));
    }
    req.user = user;
    next();
  });
};
