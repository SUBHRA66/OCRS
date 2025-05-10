import axios from "axios";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { removeAdmin } from "../slices/adminSlice";
import { removeAdvisor } from "../slices/advisorSlice";
import { removeStudent } from "../slices/studentSlice";
import { removeFaculty } from "../slices/facultySlice";
import {
  clearAllCourseState,
  removeBacklogCourses,
  removeCourses,
  removeCreditCount,
  removeSelectedCourse,
} from "../slices/courseSlice";

export const Navbar = ({ navLinks, user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    const response = await axios.post(
      BASE_URL + user + "/logout",
      {},
      { withCredentials: true }
    );

    dispatch(removeAdmin());
    dispatch(removeAdvisor());
    dispatch(removeStudent());
    dispatch(removeFaculty());
    dispatch(clearAllCourseState());
    dispatch(removeAdmin());
    navigate("/");
  };

  return (
    <div className="nav-container">
      <div className="NavBar">
        <div className="nav-heading">Navigation Panel</div>
        {navLinks.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              isActive ? "navigation-tabs active-tab" : "navigation-tabs"
            }
          >
            {link.name}
          </NavLink>
        ))}

        <button className="logout-btn" onClick={logoutHandler}>
          LOGOUT
        </button>
      </div>
      <div className="common-dashboard-container">
        <Outlet />
      </div>
    </div>
  );
};
