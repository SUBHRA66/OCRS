import studentImg from "../../assests/pppp.jpg";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";

const NavLinks = [
  { 
    name: "REQUESTS", 
    path: "/advisor/course-reg/students/dash/manage-req" },
  {
    name: "CURRENT SEMESTER",
    path: "/advisor/course-reg/students/dash/curr-sem",
  },
  {
    name: "COMPLETED COURSES",
    path: "/advisor/course-reg/students/dash/completed-courses",
  },
];
export const AdvisorCourseReg = () => {
  const student = useSelector((state) => state.student);

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
        <div className="NavBar">
          <div className="nav-heading">Navigation Panel</div>
          {NavLinks.map((link) => (
            <Link key={link.name} to={link.path}>
              <div className="navigation-tabs">{link.name}</div>
            </Link>
          ))}
        </div>

        <div className="fac-dashboard-container">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
