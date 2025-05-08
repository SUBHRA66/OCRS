import { adminNavLInks } from "../../config/navConfig";
import { Navbar } from "../Navbar";

export const AdminDashboard = () => {
  return <Navbar navLinks={adminNavLInks} user="admin" />;
};
