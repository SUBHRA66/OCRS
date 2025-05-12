import axios from "axios";
import { useState } from "react";
import { addStudent } from "../slices/studentSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { addFaculty } from "../slices/facultySlice";
import { addAdvisor } from "../slices/advisorSlice";
import { addAdmin } from "../slices/adminSlice";
import { ToastContainer, toast } from "react-toastify";
import validator from "validator";
import { ToastMessage } from "./ToastMessage";

export const Login = () => {
  const [clickedLoggedin, setClickedLoggedin] = useState(false);
  const [role, setRole] = useState("");
  const [rollno, setRollno] = useState("");
  const [email, setEmail] = useState("");
  const [passwd, setPasswd] = useState("");
  const [msg, setMsg] = useState("Enter Credentials to login");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const displayMsg = (msg) => {
    toast(<ToastMessage message={msg} />);
  };

  const loginhandler = async () => {
    if (validator.isEmpty(role)) displayMsg("Enter Credentials to login");
    console.log("Login Button was clicked");
    setClickedLoggedin(true);
    let data, flag, message;
    if (role === "student") {
      const response = await axios.post(
        BASE_URL + "student/login",
        {
          rollno: rollno,
          password: passwd,
        },
        { withCredentials: true }
      );
      ({ data, flag, message } = response.data);
      setMsg(message);
      if (flag == 1) {
        dispatch(addStudent(data));
        return navigate("/student/dashboard");
      } else {
        setMsg(message);
        displayMsg(message);
        console.log(message);
        return navigate("/");
      }
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
      ({ data, flag, message } = response.data);
      if (flag == 1) {
        dispatch(addFaculty(data));
        navigate("/faculty/dashboard");
      } else {
        setMsg(message);
        displayMsg(message);
        return navigate("/");
      }
    } else if (role === "advisor") {
      const response = await axios.post(
        BASE_URL + "advisor/login",
        {
          advEmail: email,
          advPwd: passwd,
        },
        { withCredentials: true }
      );
      ({ data, flag, message } = response.data);
      console.log(response);
      if (flag == 1) {
        dispatch(addAdvisor(data));
        return navigate("/advisor/dashboard");
      } else {
        setMsg(message);
        displayMsg(message);
        return navigate("/");
      }
    } else if (role === "admin") {
      const response = await axios.post(
        BASE_URL + "admin/login",
        {
          adminEmail: email,
          adminPwd: passwd,
        },
        { withCredentials: true }
      );
      ({ data, flag, message } = response.data);
      if (flag == 1) {
        dispatch(addAdmin(data));
        return navigate("/admin/dashboard");
      } else {
        setMsg(message);
        displayMsg(message);
        console.log("here");
        return navigate("/");
      }
    }
  };

  const forgetPasswordHandler = () => {
    navigate("/forget-password");
  };

  return (
    <div className="login-container">
      <div className="dropdown">
        <div className="dropdowntext">Select Role</div>
        {clickedLoggedin && validator.isEmpty(role) && (
          <div style={{ color: "red", fontSize: "14px", marginTop: "5px" }}>
            Select a role
          </div>
        )}
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="">Select one</option>
          <option value="student">Student</option>
          <option value="faculty">Faculty</option>
          <option value="advisor">Advisor</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <div className="inputs">
        {clickedLoggedin &&
          validator.isEmpty(rollno) &&
          validator.isEmpty(email) && (
            <div style={{ color: "red", fontSize: "14px" }}>
              {role == "student" ? "rollno" : "email"} cannot be empty
            </div>
          )}

        <div className="input">
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
        {clickedLoggedin && validator.isEmpty(passwd) && (
          <div style={{ color: "red", fontSize: "14px" }}>
            password cannot be empty
          </div>
        )}
        <div className="input">
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
        <span className="forget-pwd" onClick={forgetPasswordHandler}>
          Forget password
        </span>

        <button
          className="submitBtn"
          onClick={() => {
            loginhandler();
            setClickedLoggedin(true);
          }}
        >
          Log In
        </button>
        <ToastContainer />
      </div>
    </div>
  );
};
