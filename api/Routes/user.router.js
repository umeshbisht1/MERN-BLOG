import express from 'express'
const router=express.Router();

import { verfiyuser } from '../utils/Verfieduser.js';
import { test ,update,deleteaccount,signout} from '../controller/user.controller.js';
//router.get("/test",test)
router.route("/test").get(test)
router.route("/update/:id").put(verfiyuser,update)
router.route("/delete/:id").delete(verfiyuser,deleteaccount);
router.route("/signout").post(signout);
export default router