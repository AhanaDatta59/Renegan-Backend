import mongoose from "mongoose";
import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./src/routes/authRoutes.js"; // Import the authRoutes

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

const corsConfig = {
  credentials: true,
  origin: true,
};

app.use(cors(corsConfig));

app.use(morgan("tiny"));

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

// Use the authRoutes
app.use("/auth", authRoutes);
//app.use('/verify', otpVerifyController); // For OTP verification
// Define other routes as needed

// Start the server

mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });
