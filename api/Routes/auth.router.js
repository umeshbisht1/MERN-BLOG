import express from 'express'
const router=express.Router();
import { signup } from '../controller/auth.controller.js';
router.post("/Signup",signup);
export default router;