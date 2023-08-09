import { createError } from "../error.js";
import { Student } from "../models/students.js";
// Controller function to store student data
export const storeStudentData = async (req, res, next) => {
    try {
      const { email, password, passwordAuth, fullName, username, img } = req.body;
  
      // Create a new student document using the Student model
      const newStudent = new Student({
        email,
        password,
        passwordAuth,
        fullName,
        username,
        img,
      });
  
      // Save the new student document to the database
      const savedStudent = await newStudent.save();
  
      // Respond with success message and saved student data
      res.status(201).json({
        message: 'Student data stored successfully',
        student: savedStudent,
      });
    } catch (error) {
     return  next(createError(500,'Something went wrong'))
    }
  };
  