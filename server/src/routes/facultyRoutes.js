import express from "express";
import { facultyLogin, facultyLogout } from "../controllers/authController.js";
import { auth } from "../middlewares/auth.js";
import { facultyProfile } from "../controllers/profileController.js";
import { facultyMyCourses, seeCourses } from "../controllers/couresRegController.js";
export const facultyRouter = express.Router();

facultyRouter.post("/login", facultyLogin );

facultyRouter.post("/logout", facultyLogout);

facultyRouter.get("/profile",
  auth("instructor", "insEmail", process.env.MYSQL_FACULTY_TOKEN_PRIVATE_KEY),
  facultyProfile
);
facultyRouter.get("/see-students",
  auth("instructor", "insEmail", process.env.MYSQL_FACULTY_TOKEN_PRIVATE_KEY),
  seeCourses  
);
facultyRouter.get("/my-courses",
  auth("instructor", "insEmail", process.env.MYSQL_FACULTY_TOKEN_PRIVATE_KEY),
  facultyMyCourses  
);