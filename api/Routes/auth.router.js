import express from 'express'
const router=express.Router();
import { signup,signin, google } from '../controller/auth.controller.js';
router.post("/Signup",signup);
router.route("/signin").post(signin)
router.route("/google").post(google)
export default router;