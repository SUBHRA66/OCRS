import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <div className="left-navbar">
      <h2 className="navbar-brand">Student Portal</h2>
      <ul className="navbar-links">
        <li><Link to="/dashboard/profile">Profile</Link></li>
        <li><Link to="/dashboard/current-semester">Current Semester</Link></li>
        <li><Link to="/dashboard/course-registration">Course Registration</Link></li>
        <li><Link to="/">Logout</Link></li>
      </ul>
    </div>
  );
};
