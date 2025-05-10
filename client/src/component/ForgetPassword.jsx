import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";
export const ForgetPassword = () => {
  const [role, setRole] = useState("");
  const [rollno, setRollno] = useState("");
  const [email, setEmail] = useState("");
  const [sendOTP, setSendOTP] = useState(false);
  const [otp, setOtp] = useState();
  const [updatePassword, setUpdatePassword] = useState(false);
  const [newPassword, setNewPassword] = useState();
  const [newPasswordAgain, setNewPasswordAgain] = useState();

  const navigate = useNavigate();
  const SendOTPHandler = async () => {
    try {
      const payload = {
        role,
        ...(role === "student" ? { rollno } : { email }),
      };

      const response = await axios.post(BASE_URL + "forget-password", payload);
      setSendOTP(true);
      console.log(response);
    } catch (error) {
      console.error("Failed to send OTP:", error);
    }
  };

  const verifyOTPHandler = async (oneTimePassword, rollno) => {
    console.log(rollno);
    const payload = {
      oneTimePassword: oneTimePassword,
      ...(role === "student" ? { rollno } : { email }),
    };
    const response = await axios.post(BASE_URL + "verify-otp", payload);
    if (response.data) {
      setUpdatePassword(true);
      setSendOTP(false);
    }
  };
  const changePasswordHandler = async () => {
    console.log(newPassword);
    console.log(newPasswordAgain);
    if (newPassword == newPasswordAgain) {
      const response = await axios.post(BASE_URL + "update-password", {
        pwd: newPassword,
        rollno: rollno
      });
      console.log(response);
      navigate("/");
    }
  };
  return (
    <div className="forgpwd">
      <h2>Forget Password Page</h2>

      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="">Select User</option>
        <option value="student">Student</option>
        <option value="faculty">Faculty</option>
        <option value="advisor">Advisor</option>
        <option value="admin">Admin</option>
      </select>

      <div className="inputs">
        <input
          onChange={(e) => {
            role === "student"
              ? setRollno(e.target.value)
              : setEmail(e.target.value);
          }}
          type={role === "student" ? "text" : "email"}
          className="user-input"
          placeholder={
            role === "student" ? "Enter your Roll No" : "Enter your email"
          }
          name={role === "student" ? "rollno" : "email"}
        />

        {sendOTP ? (
          <input
            onChange={(e) => setOtp(e.target.value)}
            type="text"
            placeholder="Enter OTP"
            name="otp"
          />
        ) : (
          <div className=""></div>
        )}

        {updatePassword ? (
          <input
            onChange={(e) => setNewPassword(e.target.value)}
            type="password"
            placeholder="Enter new Password"
            name="newPassword"
          />
        ) : (
          <div className=""></div>
        )}

        {updatePassword ? (
          <input
            onChange={(e) => setNewPasswordAgain(e.target.value)}
            type="password"
            placeholder="Re-enter new Password"
            name="newPasswordAgain"
          />
        ) : (
          <div className=""></div>
        )}
      </div>
      <button
        className="send-otp-btn"
        onClick={
          updatePassword
            ? changePasswordHandler
            : sendOTP
            ? () => verifyOTPHandler(otp, rollno)
            : SendOTPHandler
        }
      >
        {updatePassword
          ? "Change Password"
          : sendOTP
          ? "Verify OTP"
          : "Send OTP"}
      </button>
    </div>
  );
};
