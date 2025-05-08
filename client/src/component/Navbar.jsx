import axios from "axios";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { removeAdmin } from "../slices/adminSlice";
import { removeAdvisor } from "../slices/advisorSlice";
import { removeStudent } from "../slices/studentSlice";
import { removeFaculty } from "../slices/facultySlice";
import { clearAllCourseState, removeBacklogCourses, removeCourses, removeCreditCount, removeSelectedCourse } from "../slices/courseSlice";

export const Navbar = ({ navLinks, user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutHandler = async () => {
    const response = await axios.post(
      BASE_URL + user + "/logout",
      {},
      { withCredentials: true }
    );

    dispatch(removeAdmin())
    dispatch(removeAdvisor())
    dispatch(removeStudent())
    dispatch(removeFaculty())
    console.log("here")
    dispatch(clearAllCourseState())
    console.log("here")
    console.log(user);
    console.log(response)
    dispatch(removeAdmin());
    navigate("/");
  };

  return (
    <div className="main-container">
      <div className="NavBar">
        <div className="nav-heading">Navigation Panel</div>
        {navLinks.map((link) => (
          <Link key={link.name} to={link.path}>
            <div className="navigation-tabs">{link.name}</div>
          </Link>
        ))}
        <button className="logout-btn" onClick={logoutHandler}>
          LOGOUT
        </button>
      </div>
      <div className="fac-dashboard-container">
        <Outlet />
      </div>
    </div>
  );
};
