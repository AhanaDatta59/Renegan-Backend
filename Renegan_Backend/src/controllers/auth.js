import colleges from "../data/college.json" assert { type: "json" };
import fs from "fs";
import nodemailer from "nodemailer"; // Import Nodemailer
import { createError } from "../error.js";
import dotenv from "dotenv";



// Create a Nodemailer transporter with your email service provider's settings
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
  port: 465,
  host: "smtp.gmail.com",
});
//console.log(port);

export const emailDomainVerify = async (req, res, next) => {
  const { email } = req.body;

  const matchingCollege = colleges.info.find((college) => {
    if (college.domains) {
      return college.domains.some((domain) => email.endsWith(domain));
    }
    return false;
  });

  if (matchingCollege) {
    // Generate and send OTP (One-Time Password)
    return res.status(200).json({
      college: matchingCollege,
    });
  } else {
    return next(createError(403, "Domain not found"));
  }
};

// Generate a random OTP (for demonstration purposes)
const generateOTP = (req, res) => {
  const digits = "0123456789";
  let otp = "";
  for (let i = 0; i < 6; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }

  return otp;
};

export const generatedOtp = async (req, res, next) => {
  const { email } = req.body;
  const otp = generateOTP();
  req.app.locals.OTP = otp; // Implement your OTP generation logic

  // Configure the email options
  const mailOptions = {
    from: "renegan.in@gmail.com",
    to: email,
    subject: "OTP Verification",
    text: `Your OTP is: ${otp}`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return next(createError(500, "Error sending OTP email"));
    } else {
      return res.status(200).json({
        message: "OTP sent successfully",
      });
    }
  });
  return res.status(200).json({
    message: "OTP sent successfully",
  });
};

export const otpVerify = async (req, res, next) => {
  const { otp } = req.body;

  const storedOtp = req.app.locals.OTP; // Access the stored OTP from the session

  if (otp === storedOtp) {
    req.app.locals.OTP = null;
    req.app.locals.resetSession = true;
    return res.status(200).json({ message: "OTP verified successfully" });
  } else {
    return next(createError(400, "Invalid OTP"));
  }
};
