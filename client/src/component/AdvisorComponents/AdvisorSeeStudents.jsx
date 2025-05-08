import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addStudent } from "../../slices/studentSlice";
export const AdvisorSeeStudents = () => {
  // Dummy student data
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [students, setStudents] = useState([]);
  const fetchStudents = async () => {
    const response = axios.get(BASE_URL + "advisor/course-reg/students", {
      withCredentials: true,
    });
    return response;
  };
  useEffect(() => {
    async function fetchStd() {
      const response = await fetchStudents();
      setStudents(response.data);
    }

    fetchStd(); // Calling the function
  }, []);

  const clickHandler = (student) => {
    dispatch(addStudent(student));
    navigate("/advisor/course-reg/students/dash")
  };
  return (
    <div className="advisor-page">
      <h1 className="advisor-page__headline">Students</h1>
      <div className="advisor-page__grid">
        {students.map((student) => (
          <div
            key={student.rollno}
            className="student-card"
            onClick={() => clickHandler(student)}
            style={{ cursor: "pointer" }}
          >
            <div className="student-card__name">{student.sname}</div>
            <div className="student-card__rollno">
              Roll No: {student.rollno}
            </div>
            <div className="student-card__cgpa">CGPA: {student.scgpa}</div>
            <div className="student-card__semester">
              Semester: {student.ssem}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
