import React from "react";
import { useSelector } from "react-redux";
import sakilImg from "../../assests/Sakil.png";

export const StudentProfile = () => {
  const student = useSelector((state) => state.student);
  console.log(student);
  const editProfileHandler = ()=>{
    console.log("EDIT PROFILE")
  }
  return (
    <div className="student-profile-container">
      <div className="studentprofile">
        <div className="pl">
          <img src={sakilImg} alt="" />
          <h2>{student?.sname}</h2>
          <span>{student?.rollno}</span>
          <button className="edit-profile" onClick={editProfileHandler}>Edit Profile</button>
        </div>

        <div className="pr">
          <div className="p-items">
            <div className="p-label">Department</div>
            <div className="p-value">{student?.sdept}</div>
          </div>
          <div className="p-item">
            <div className="p-label">Semester</div>
            <div className="p-value">{student?.ssem}</div>
          </div>
          <div className="p-item">
            <div className="p-label">CGPA</div>
            <div className="p-value">{student?.scgpa}</div>
          </div>
          <div className="p-item">
            <div className="p-label">School</div>
            <div className="p-value">{student?.sschool}</div>
          </div>
          <div className="p-item">
            <div className="p-label">Contact</div>
            <div className="p-value">{student?.contact}</div>
          </div>
          <div className="p-item">
            <div className="p-label">Email</div>
            <div className="p-value">{student?.semail}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
