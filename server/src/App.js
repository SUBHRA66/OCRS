import express from "express";
import cors from "cors"
const app = express();
import { studentRouter } from  "./routes/studentRoutes.js"
import { facultyRouter } from "./routes/facultyRoutes.js";
import { adminRouter} from "./routes/adminRoutes.js";
import { advisorRouter } from "./routes/advisorRoutes.js";
import { forgetPassword, verifyOTP, updatePassword } from "./controllers/authController.js";
import cookieParser from "cookie-parser";
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json())
app.use(cookieParser())

app.use("/student", studentRouter);
app.use("/faculty", facultyRouter)
app.use("/advisor", advisorRouter)
app.use("/admin", adminRouter)
app.use("/forget-password", forgetPassword);
app.use("/verify-otp", verifyOTP);
app.use("/update-password", updatePassword)

app.listen(5555, ()=>{
  console.log("Server started at port number 5555")
});