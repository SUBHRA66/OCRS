import React from "react";
import { useSelector } from "react-redux";
import adminImage from "../../assests/Sakil.png"; 

export const AdminProfile = () => {
  const admin = useSelector((state) => state.admin);
  console.log(admin)
  return (

      <div className="facultyprofile">
        <div className="profile-left">
          <img src={adminImage} alt="Faculty" />
          <h2>{admin?.adminName}</h2>
          <span>{admin?.adminId}</span>
        </div>
        <div className="profile-right">
          <div className="profile-item">
            <div className="profile-label">Department</div>
            <div className="profile-value">{admin?.adminDept}</div>
          </div>
        </div>
      </div>
  );
};
