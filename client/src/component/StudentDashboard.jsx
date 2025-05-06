import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addStudent } from "../studentSlice";
import { addCourses } from "../courseSlice";

export const StudentDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const student = useSelector((state) => state.student);

  const profileHandler = async () => {
    const response = await axios.get(BASE_URL + "student/profile", {
      withCredentials: true,
    });

    console.log(response);
    dispatch(addStudent(response.data.user));
    return navigate("/student/profile");
  };

  const currentSemesterHandler = async () => {
    const response = await axios.get(
      BASE_URL + "student/profile/registered-courses",
      { withCredentials: true }
    );
    console.log(response.data.courses); //array of courses
    dispatch(addCourses(response.data.courses));
    return navigate("/student/mycourses");
  };

  const courseRegistrationHandler = async () => {
    
    //response.data.courses is an array of courses
    return navigate("/student/course-registration");
  };

  return (
    <div className="stud-dash-container">
      <button className="dashboard-buttons" onClick={profileHandler}>
        PROFILE
      </button>
      <button className="dashboard-buttons" onClick={currentSemesterHandler}>
        CURRENT SEMESTER
      </button>
      <button className="dashboard-buttons" onClick={courseRegistrationHandler}>
        COURSE REGISTRATION
      </button>
    </div>
  );
};
