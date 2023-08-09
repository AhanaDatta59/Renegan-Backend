import mongoose from 'mongoose';

// Defining the schema for the student collection
const studentSchema = new mongoose.Schema({
  email: { type: String, required: true },//email
  password: { type: String, required: false },//password
  passwordAuth: { type: Boolean, default: false },//passwordAuth
  fullName: { type: String, required: true },//fullname
  username: { type: String, required: true },//username
  img: {type: String, required: false}//for img
});

// Create a mongoose model for the student collection
export const Student = mongoose.model('Student', studentSchema);

// // Controller function to store student data
// export const storeStudentData = async (req, res) => {
//   try {
//     const { email, password, passwordAuth, fullName, username, img } = req.body;

//     // Create a new student document using the Student model
//     const newStudent = new Student({
//       email,
//       password,
//       passwordAuth,
//       fullName,
//       username,
//       img,
//     });

//     // Save the new student document to the database
//     const savedStudent = await newStudent.save();

//     // Respond with success message and saved student data
//     res.status(201).json({
//       message: 'Student data stored successfully',
//       student: savedStudent,
//     });
//   } catch (error) {
//     console.error('Error storing student data:', error);
//     res.status(500).json({ message: 'Error storing student data' });
//   }
// };
