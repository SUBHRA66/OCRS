import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/constants";

export const FacultyCourses = () => {
  const [mycourses, setMycourses] = useState([]);

  useEffect(() => {
    async function fetchCourse() {
      const response = await axios.get(BASE_URL + "faculty/my-courses", {
        withCredentials: true,
      });
      setMycourses(response.data);
    }
    fetchCourse();
  }, []);
  console.log(mycourses);
  return (
    <div className="my-courses-container">
      {mycourses.map((course) => (
        <div key={course.code} className="course-row">
          <div className="course-detail">
            <strong>{course.cname}</strong>
          </div>
          <div className="course-detail">
            Course Code: <strong>{course.ccode}</strong>
          </div>
          <div className="course-detail">
            Credit:<strong>{course.ccredit}</strong>
          </div>
          <div className="course-detail">
            <strong>Type:</strong> {course.ctype}
          </div>

          <div className="course-detail">
            Semester: <strong>6</strong>
          </div>
          <button className="course-button">See Students</button>
        </div>
      ))}
    </div>
  );
};
