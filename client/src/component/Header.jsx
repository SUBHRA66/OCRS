import React from "react";
import { useSelector } from "react-redux";
import ghssImg from "../assests/GHSS.png";

//HEADER t ERROR ase
export const Header = () => {
  const student = useSelector((state) => state.student);
  const advisor = useSelector((state) => state.advisor);
  const faculty = useSelector((state) => state.faculty);
  console.log("HEADER LOADED");
  return (
    <header className="header-container">
      <div className="logo">
        <img src={ghssImg} alt="" />
      </div>
      <div className="header-content">
        {student.sname || advisor.advName || faculty.insName ? (
          <span className="welcome-text">Welcome {student.sname || advisor.advName || faculty.insName}</span>
        ) : (
          <span className="welcome-text">Welcome to OCRES</span>
        )}
      </div>
    </header>
  );
};
