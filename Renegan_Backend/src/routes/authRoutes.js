import { localVariables } from "../middleware/veriftEmail.js";
// export default router;
import express from "express";
//const express =  require('express')

import { emailDomainVerify, generatedOtp } from "../controllers/auth.js";
import { otpVerify } from "../controllers/auth.js";
import {  storeStudentData}from '../controllers/student.js';

//router object
const router = express.Router();

//routes
//LOGIN||POST
router.post("/emailVerify", emailDomainVerify);
router.post("/generateOtp", localVariables, generatedOtp);
router.post("/otpVerify", otpVerify);
router.post('/storeStudentData', storeStudentData);

export default router;
