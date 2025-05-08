import express from "express";
import { adminLogin, adminLogout } from "../controllers/authController.js";
import { adminProfile } from "../controllers/profileController.js";
import { auth } from "../middlewares/auth.js";
import { addCourses, getAllCourses, getAllStudents, getAllFaculties } from "../controllers/couresRegController.js";
export const adminRouter = express.Router();

adminRouter.post("/login", adminLogin);
adminRouter.post("/logout", adminLogout);
adminRouter.get("/profile", 
  auth("admin", "adminEmail", process.env.MYSQL_ADMIN_TOKEN_PRIVATE_KEY),  
  adminProfile
);

adminRouter.post("/add-course", 
  auth("admin", "adminEmail", process.env.MYSQL_ADMIN_TOKEN_PRIVATE_KEY),
  addCourses
)
adminRouter.post("/get-courses", 
  auth("admin", "adminEmail", process.env.MYSQL_ADMIN_TOKEN_PRIVATE_KEY),
  getAllCourses
)
adminRouter.post("/get-students", 
  auth("admin", "adminEmail", process.env.MYSQL_ADMIN_TOKEN_PRIVATE_KEY),
  getAllStudents
)
adminRouter.post("/get-faculties", 
  auth("admin", "adminEmail", process.env.MYSQL_ADMIN_TOKEN_PRIVATE_KEY),
  getAllFaculties
)