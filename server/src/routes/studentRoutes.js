import express from "express";
import {
  studentLogin,
  studentLogout,
  forgetPassword,
} from "../controllers/authController.js";
import { studentProfile } from "../controllers/profileController.js";
import {
  courses,
  courseSelection,
  myRegisteredCourses,
  pastCourses,
  courseRegReq,
  deleteRegReq,
  getRequests,
  electiveCourses
} from "../controllers/couresRegController.js";

import { auth } from "../middlewares/auth.js";
export const studentRouter = express.Router();

studentRouter.post("/login", studentLogin);
studentRouter.post("/logout", studentLogout);

studentRouter.get(
  "/profile",
  auth("student", "rollno", process.env.MYSQL_STUDENT_TOKEN_PRIVATE_KEY),
  studentProfile
);

studentRouter.get(
  "/profile/registered-courses",
  auth("student", "rollno", process.env.MYSQL_STUDENT_TOKEN_PRIVATE_KEY),
  myRegisteredCourses
);

studentRouter.post(
  "/course-reg",
  auth("student", "rollno", process.env.MYSQL_STUDENT_TOKEN_PRIVATE_KEY),
  async (req, res) => {
    //TO BE DONE
    res.send("WELCOME TO THE COURSE REGISTRATION PORTAL");
  }
);

studentRouter.get(
  "/course-reg/courses",
  auth("student", "rollno", process.env.MYSQL_STUDENT_TOKEN_PRIVATE_KEY),
  courses
);

studentRouter.post(
  "/course-reg/delete-regreq",
  auth("student", "rollno", process.env.MYSQL_STUDENT_TOKEN_PRIVATE_KEY),
  deleteRegReq
);

studentRouter.get(
  "/course-reg/course-regreq",
  auth("student", "rollno", process.env.MYSQL_STUDENT_TOKEN_PRIVATE_KEY),
  courseRegReq
);

studentRouter.get(
  "/course-reg/get-requests",
  auth("student", "rollno", process.env.MYSQL_STUDENT_TOKEN_PRIVATE_KEY),
  getRequests
);
studentRouter.post(
  "/course-reg/course-selection",
  auth("student", "rollno", process.env.MYSQL_STUDENT_TOKEN_PRIVATE_KEY),
  courseSelection
);

studentRouter.get(
  "/course-reg/past-courses",
  auth("student", "rollno", process.env.MYSQL_STUDENT_TOKEN_PRIVATE_KEY),
  pastCourses
);

studentRouter.get(
  "/course-reg/elective-courses",
  auth("student", "rollno", process.env.MYSQL_STUDENT_TOKEN_PRIVATE_KEY),
  electiveCourses
);
