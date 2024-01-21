import express from 'express'
const router=express.Router();
import { test } from '../controller/user.controller.js';
//router.get("/test",test)
router.route("/test").get(test)
export default router