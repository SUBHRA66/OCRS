import { useDispatch, useSelector } from "react-redux";
import { removeFaculty } from "../../facultySlice";
import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";

export const FacultyLogout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    async function logout() {
      await axios.post(
        BASE_URL + "faculty/logout",
        {},
        { withCredentials: true }
      );
    }
    logout();
  }, []);
  console.log("LOG OUT HOL DEH");
  dispatch(removeFaculty());
  return <div className="lala">ss</div>;
};
