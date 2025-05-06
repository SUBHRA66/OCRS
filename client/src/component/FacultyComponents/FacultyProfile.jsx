import React from "react";
import { useSelector } from "react-redux";
import facultyImg from "../../assests/Sakil.png"; 

export const FacultyProfile = () => {
  const faculty = useSelector((state) => state.faculty);
  return (

      <div className="facultyprofile">
        <div className="profile-left">
          <img src={facultyImg} alt="Faculty" />
          <h2>{faculty?.insName}</h2>
          <span>{faculty?.insId}</span>
        </div>
        <div className="profile-right">
          <div className="profile-item">
            <div className="profile-label">Department</div>
            <div className="profile-value">{faculty?.insDept}</div>
          </div>
        </div>
      </div>
  );
};
