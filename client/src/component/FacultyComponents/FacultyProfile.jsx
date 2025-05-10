import React from "react";
import { useSelector } from "react-redux";
import facultyImg from "../../assests/Sakil.png";

export const FacultyProfile = () => {
  const faculty = useSelector((state) => state.faculty);
  return (
    <div className="fp">
      <div className="fac-profile-left">
        <img src={facultyImg} alt="Faculty" />
        <h2>{faculty?.insName}</h2>
        <span>Id: <strong>{faculty?.insId}</strong></span>
      </div>
      <div className="fac-profile-right">
        <div className="fac-profile-item">
          <div className="fac-profile-label">Department</div>
          <div className="fac-profile-value">{faculty?.insDept}</div>
        </div>
        <div className="fac-profile-item">
          <div className="fac-profile-label">School</div>
          <div className="fac-profile-value">{faculty?.insSchool}</div>
        </div>
      </div>
    </div>
  );
};
