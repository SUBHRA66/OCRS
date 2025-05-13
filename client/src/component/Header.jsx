import { useSelector } from "react-redux";
import ghssImg from "../assests/wordart.png";

//HEADER t ERROR ase
export const Header = () => {
  console.log("HEADER LOADED");
  const student = useSelector((state) => state.student);
  const faculty = useSelector((state) => state.faculty);
  const advisor = useSelector((state) => state.advisor);
  const admin = useSelector((state) => state.admin);
  const userName = advisor?.advName  || faculty?.insName || admin?.adminName ||student?.sname
  const rollno = student?.rollno;
  return (
    <header className="header-container">
      <div className="logo">
        <img src={ghssImg} alt="" />
      </div>
      <div className="header-content">
        {userName ? (
          <span className="welcome-text">
            Welcome {userName}
            {rollno && (
              <div className="" style={{textAlign: "center"}}>Roll No: {rollno}</div>
            )}
          </span>
        ) : (
          <span className="welcome-text">Welcome to Online Course Registration System</span>
        )}
      </div>
    </header>
  );
};
