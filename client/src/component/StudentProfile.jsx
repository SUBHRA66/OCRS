import React from "react";
import { useSelector } from "react-redux";
import sakilImg from "../assests/Sakil.png"

export const StudentProfile = () => {
  const student = useSelector((state) => state.student);

  return (
    <div className="profile-container">
      <div className="studentprofile">
        <div className="profile-left">
          <img src={sakilImg} alt="" />
          <h2>{student?.sname}</h2>
          <span>{student?.rollno}</span>
        </div>
        <div className="profile-right">
          <div className="profile-item">
            <div className="profile-label">Department</div>
            <div className="profile-value">{student?.sdept}</div>
          </div>
          <div className="profile-item">
            <div className="profile-label">Semester</div>
            <div className="profile-value">{student?.ssem}</div>
          </div>
          <div className="profile-item">
            <div className="profile-label">CGPA</div>
            <div className="profile-value">{student?.scgpa}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
