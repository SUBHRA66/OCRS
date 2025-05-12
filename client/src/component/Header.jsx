import React from "react";
import { useSelector } from "react-redux";
import ghssImg from "../assests/GHSS.png";

//HEADER t ERROR ase
export const Header = () => {
  console.log("HEADER LOADED");
  const student = useSelector((state) => state.student);
  const faculty = useSelector((state) => state.faculty);
  const advisor = useSelector((state) => state.advisor);
  const admin = useSelector((state) => state.admin);
  const userName = advisor?.advName  || faculty?.insName || admin?.adminName ||student?.sname

  return (
    <header className="header-container">
      <div className="logo">
        <img src={ghssImg} alt="" />
      </div>
      <div className="header-content">
        {userName ? (
          <span className="welcome-text">
            Welcome {userName}
          </span>
        ) : (
          <span className="welcome-text">Welcome to Online Course Registration System</span>
        )}
      </div>
    </header>
  );
};
