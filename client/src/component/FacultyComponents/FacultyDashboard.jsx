import { Link, Outlet } from "react-router-dom";
import { faculyNavLinks } from "../../config/navConfig";

export const FacultyDashboard = () => {
  return (
    <div className="main-container">
      <div className="NavBar">
        <div className="nav-heading">Navigation Panel</div>
        {faculyNavLinks.map((link) => (
          <Link key={link.name} to={link.path}>
            <div className="navigation-tabs">{link.name}</div>
          </Link>
        ))}
      </div>

      <div className="fac-dashboard-container">
        <Outlet />
      </div>
    </div>
  );
};
