import axios from "axios";
import { addAdvisor } from "../advisorSlice";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import AdvisoImg from "../assests/pppp.jpg";
import { Navbar } from "./Navbar";
export const AdvisorDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const advisor = useSelector((state) => state.advisor);
  const courseRegHandler = () => {
    console.log("course registration portal from Advisor");
    navigate("/advisor/course-reg/students");
  };
  return (
    <div className="dashboard-container">
      <div className="profile-and-buttons">
        <div className="profile-card">
          <img src={AdvisoImg} alt="Advisor" className="profile-image" />
          <h2 className="profile-name">{advisor.advName}</h2>
          <p className="profile-department">Department: {advisor.advDept}</p>
          <p className="profile-id">Faculty ID: {advisor.advId}</p>
          <p className="profile-email">Email: {advisor.advEmail}</p>
          <button className="dashboard-button">Edit Profile</button>
        </div>

        <div className="button-islands">
          <div className="island-button" onClick={courseRegHandler}>
            <h3>Course Registration</h3>
            <p>View and manage course registrations</p>
          </div>
          <div className="island-button secondary">
            <h3>Faculty Dashboard</h3>
            <p>Operate as a faculty</p>
          </div>
        </div>
      </div>
    </div>
  );
};