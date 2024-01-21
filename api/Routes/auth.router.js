import express from 'express'
const router=express.Router();
import { signup,signin } from '../controller/auth.controller.js';
router.post("/Signup",signup);
router.route("/signin").post(signin)
export default router;