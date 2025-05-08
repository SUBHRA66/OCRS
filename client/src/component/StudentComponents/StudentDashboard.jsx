import { studentNavLinks } from "../../config/navConfig";
import { Navbar } from "../Navbar";

export const StudentDashboard = () => {
  return <Navbar navLinks={studentNavLinks} user="student" />;
};
