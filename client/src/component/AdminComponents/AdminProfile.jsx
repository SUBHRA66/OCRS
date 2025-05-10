import React from "react";
import { useSelector } from "react-redux";
import adminImage from "../../assests/Sakil.png";

export const AdminProfile = () => {
  const admin = useSelector((state) => state.admin);
  console.log(admin.items);
  return (
    <div className="admin-prof">
      <div className="adm-profile-left">
        <img src={adminImage} alt="Faculty" />
        <h2>{admin?.items.adminName}</h2>
        <span>{admin?.items.adminId}</span>
      </div>
      <div className="adm-profile-right">
        <div className="adm-profile-item">
          <div className="adm-profile-label">Department</div>
          <div className="adm-profile-value">{admin?.items.adminDept}</div>
        </div>
      </div>
    </div>
  );
};
