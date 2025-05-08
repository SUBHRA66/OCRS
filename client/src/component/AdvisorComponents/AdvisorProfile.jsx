import React from "react";
import { useSelector } from "react-redux";
import facultyImg from "../../assests/Sakil.png"; // Make sure you have an image for faculty

export const AdvisorProfile = () => {
  const advisor = useSelector((state) => state.advisor);

  return (
    <div className="profile-container">
      <div className="facultyprofile">
        <div className="profile-left">
          <img src={facultyImg} alt="Advisor" />
          <h2>{advisor?.advName}</h2>
          <span>{advisor?.advId}</span>
        </div>
        <div className="profile-right">
          <div className="profile-item">
            <div className="profile-label">Department</div>
            <div className="profile-value">{advisor?.advDept}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
