import axios from "axios";
import { use, useState } from "react";
import { addStudent } from "../slices/studentSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { addFaculty } from "../slices/facultySlice";
import { addAdvisor } from "../slices/advisorSlice";
import { addAdmin } from "../slices/adminSlice";

export const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [action, setAction] = useState("Login"); //not required to be honest
  const [role, setRole] = useState("");
  const [rollno, setRollno] = useState("");
  const [email, setEmail] = useState("");
  const [passwd, setPasswd] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginhandler = async () => {
    console.log("Login Button was clicked");
    if (role === "student") {
      const response = await axios.post(
        BASE_URL + "student/login",
        {
          rollno: rollno,
          password: passwd,
        },
        { withCredentials: true }
      );
      console.log(response);
      setIsLoggedIn(true);
      dispatch(addStudent(response.data.data));
      return navigate("./student/dashboard");
    } else if (role === "faculty") {
      const response = await axios.post(
        BASE_URL + "faculty/login",
        {
          insEmail: email,
          insPwd: passwd,
        },
        {
          withCredentials: true,
        }
      );

      console.log(response)
      dispatch(addFaculty(response.data.data))
      setIsLoggedIn(true);
      navigate("/faculty/dashboard");
    } else if (role === "advisor") {
      const response = await axios.post(
        BASE_URL + "advisor/login",
        {
          advEmail: email,
          advPwd: passwd,
        },
        { withCredentials: true }
      );
      console.log(response);
      setIsLoggedIn(true);
      dispatch(addAdvisor(response.data.data));
      return navigate("/advisor/dashboard");
    } else if (role === "admin") {
      const response = await axios.post(BASE_URL + "admin/login", {
        adminEmail: email,
        adminPwd: passwd,
      }, {withCredentials: true});
      dispatch(addAdmin(response.data.data))    
      setIsLoggedIn(true);
      navigate("/admin/dashboard");
    }
  };

  return (
    <div className="login-container">
      <div className="dropdown">
        <div className="dropdowntext">Select Role</div>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="">Select one</option>
          <option value="student">Student</option>
          <option value="faculty">Faculty</option>
          <option value="advisor">Advisor</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <div className="inputs">
        {action === "Login" ? (
          <div></div>
        ) : (
          <div className="input">
            <input type="text" placeholder="Name" name="Name" />
          </div>
        )}

        <div className="input">
          {/* <img src={emailIcon} alt="" /> */}
          <input
            value={role === "student" ? rollno : email}
            onChange={(e) =>
              role === "student"
                ? setRollno(e.target.value)
                : setEmail(e.target.value)
            }
            type={role === "student" ? "text" : "email"}
            placeholder={role === "student" ? "Roll No." : "Email"}
            name={role === "student" ? "rollno" : "email"}
          />
        </div>
        <div className="input">
          {/* <img src={passwordIcon} alt="" /> */}
          <input
            type="password"
            placeholder="Password"
            name="passwd"
            value={passwd}
            onChange={(e) => {
              setPasswd(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="submit-container">
        <button className="submitBtn" onClick={loginhandler}>
          Log In
        </button>
      </div>
    </div>
  );
};
