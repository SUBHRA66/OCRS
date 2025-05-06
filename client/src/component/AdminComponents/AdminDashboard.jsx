import { Link, Outlet } from "react-router-dom";
import { adminNavLInks } from "../../config/navConfig";

export const AdminDashboard = () => {
  return (
    <div className="main-container">
      <div className="NavBar">
        <div className="nav-heading">Navigation Panel</div>
        {adminNavLInks.map((link) => (
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
