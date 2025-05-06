import axios from "axios";
import { StudentCard } from "./StudentCard";
import { BASE_URL } from "../utils/constants";
import studentImg from "../assests/pppp.jpg";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
export const AdvisorCourseReg = () => {
  const student = useSelector((state) => state.student);
  const [requests, setRequests] = useState([]);
  const [creditCount, setCreditCount] = useState(0);

  useEffect(() => {
    async function getAllRequests(rollno) {
      const response = await axios.get(
        BASE_URL + "advisor/course-reg/get-all-requests/" + rollno,
        { withCredentials: true }
      );
      const data = response.data;
      console.log(data);
      setRequests(data.request);
      setCreditCount(data.creditsSelected);
    }
    getAllRequests(student.rollno);
  }, []);

  const HandleApproveRequest = async (rollno) => {
    const response = await axios.post(
      BASE_URL + "advisor/course-reg/approve-request/" + rollno,
      {},
      { withCredentials: true }
    );
    console.log(response);
  };

  return (
    // HEADER COMPONENT
    <div className="main">
      <div className="header">
        <div className="header__student-info">
          <img className="header__student-img" src={studentImg} alt="Student" />
          <div className="header__student-details">
            <div className="header__student-name">{student.sname}</div>
            <div className="header__student-rollno">
              Roll No: {student.rollno}
            </div>
            <div className="header__student-sem">Semester: {student.ssem}</div>
            <div className="header__student-cgpa">CGPA: {student.scgpa}</div>
          </div>
        </div>
      </div>

      <div className="lower-container">
        {/* NAVIGATION PANEL */}
        <div className="navbar">
          NAVIGATION PANEL
          <Link to={"/advisor/course-reg/students/manage-req"}>
            <div className="navbar-tabs">REQUESTS</div>
          </Link>
          <Link to={"/advisor/course-reg/students/current-sem"}>
            <div className="navbar-tabs">CURRENT SEMESTER COURSES</div>
          </Link>
          <div className="navbar-tabs">COMPLETED COURSES</div>
          <div className="navbar-tabs"></div>
        </div>
        <Outlet/>
        <div className="student-course-reg">
          <Outlet />
          <div className="student-course-reg__headline">
            <h1>Total Credit Selected: {creditCount}</h1>
          </div>
          <div className="student-course-reg__requested-courses">
            {requests.map((course) => (
              <div key={course.ccode} className="course-row">
                <div className="course-row__code">{course.ccode}</div>
                <div className="course-row__name">{course.cname}</div>
                <div className="course-row__name">{course.ctype}</div>
                <div className="course-row__credits">
                  Credit: {course.ccredit}
                </div>
              </div>
            ))}
          </div>
          <div className="approve-reject-container">
            <button
              className="approve-request-btn"
              onClick={() => HandleApproveRequest(student.rollno)}
            >
              Approve Request
            </button>
            <button className="reject-request-btn">Reject Request</button>
          </div>
        </div>
      </div>
    </div>
  );
};
