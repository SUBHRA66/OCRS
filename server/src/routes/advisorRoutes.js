import express from "express";
import { advisorLogin, advisorLogout } from "../controllers/authController.js";
import { advisorProfile } from "../controllers/profileController.js";
import {
  getAllRequest,
  ApproveRequest,
  seeStudents,
  registeredCourses,
  RejectRequest,
  myCourses
} from "../controllers/couresRegController.js";
import { auth } from "../middlewares/auth.js";
export const advisorRouter = express.Router();
advisorRouter.post("/login", advisorLogin);
advisorRouter.post("/logout", advisorLogout);
advisorRouter.get(
  "/profile",
  auth("Advisor", "advEmail", process.env.MYSQL_ADVISOR_TOKEN_PRIVATE_KEY),
  advisorProfile
);
advisorRouter.get(
  "/adv-mycourses",
  auth("Advisor", "advEmail", process.env.MYSQL_ADVISOR_TOKEN_PRIVATE_KEY),
  myCourses
);

advisorRouter.get(
  "/course-reg/students",
  auth("advisor", "advEmail", process.env.MYSQL_ADVISOR_TOKEN_PRIVATE_KEY),
  seeStudents
);
advisorRouter.get(
  "/course-reg/get-all-requests/:rollno",
  auth("advisor", "advEmail", process.env.MYSQL_ADVISOR_TOKEN_PRIVATE_KEY),
  getAllRequest
);

advisorRouter.post(
  "/course-reg/approve-request/:rollno",
  auth("advisor", "advEmail", process.env.MYSQL_ADVISOR_TOKEN_PRIVATE_KEY),
  ApproveRequest
);

advisorRouter.post(
  "/course-reg/reject-request/:rollno",
  auth("advisor", "advEmail", process.env.MYSQL_ADVISOR_TOKEN_PRIVATE_KEY),
  RejectRequest
);

advisorRouter.post(
  "/course-reg/reg-courses/:rollno",
  auth("advisor", "advEmail", process.env.MYSQL_ADVISOR_TOKEN_PRIVATE_KEY),
  registeredCourses
);