import express from 'express'
import { verfiyuser } from '../utils/Verfieduser.js';
import { create } from '../controller/Post.controllre.js';
const router=express.Router();
router.route("/create").post(verfiyuser,create)
export default router;