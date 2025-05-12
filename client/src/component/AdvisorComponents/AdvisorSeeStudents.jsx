import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addStudent } from "../../slices/studentSlice";
export const AdvisorSeeStudents = () => {
  const advisor = useSelector((state)=>state.advisor);
  console.log(advisor)
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
  console.log(students);
  useEffect(() => {
    async function fetchStd() {
      const response = await fetchStudents();
      setStudents(response.data.data);
    }

    fetchStd(); // Calling the function
  }, []);

  const clickHandler = (student) => {
    dispatch(addStudent(student));
    navigate("/advisor/course-reg/students/dash");
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
            style={{
              cursor: "pointer",
              backgroundColor:
                student.status === "requested"
                  ? "#d0e6ff" // soft blue
                  : student.status === "approved"
                  ? "#d4f4dd" // soft green
                  : student.status === "rejected"
                  ? "#ffd6d6" // soft red/pink
                  : "",
            }}
          >
            <div className="student-card__name">
              <strong>{student.sname}</strong>
            </div>
            <div className="student-card__rollno">
              Roll No: <strong>{student.rollno}</strong>
            </div>
            <div className="student-card__cgpa">
              CGPA: <strong>{student.scgpa}</strong>
            </div>
            <div className="student-card__semester">
              Semester: <strong>{student.ssem}</strong>
            </div>
            <div className="student-card__semester">
              Status: <strong>{student.status ? student.status : "not yet requested" }</strong>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
