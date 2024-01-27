import express from 'express'
const router=express.Router();
import { verfiyuser } from '../utils/Verfieduser.js';
import { test ,update} from '../controller/user.controller.js';
//router.get("/test",test)
router.route("/test").get(test)
router.route("/update/:id").put(verfiyuser,update)
export default router