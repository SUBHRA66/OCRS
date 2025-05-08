import { faculyNavLinks } from "../../config/navConfig";
import { Navbar } from "../Navbar";

export const FacultyDashboard = () => {
  return <Navbar navLinks={faculyNavLinks} user = "faculty"/>
  
};
