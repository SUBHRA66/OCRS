import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/constants";
import { useSelector } from "react-redux";

export const AdvisorCurrSem = () => {
  const student = useSelector((state) => state.student);
  const rollno = student.rollno;
  const [regCourses, setRegCourses] = useState([]);
  useEffect(() => {
    async function registeredCourses(rollno) {
      const response = await axios.post(
        BASE_URL + "advisor/course-reg/reg-courses/" + rollno,
        {},
        { withCredentials: true }
      );
      setRegCourses(response.data.data);
      console.log(regCourses);
    }
    registeredCourses(rollno);
  }, []);

  if (regCourses.length == 0) {
    return (
      <div className="">
        <h2>{student.sname} has not selected any courses yet</h2>
      </div>
    );
  } else {
    return (
      <div className="lala">
        <h2>
          <em>CURRENT SEMESTER COURSES SELECTED BY {student.sname}</em>
        </h2>
        {regCourses.map((rc) => (
          <div key={rc.ccode} className="course-item">
            <div className="cname">
              <strong>{rc.cname}</strong>
            </div>
            <div className="cname">
              Course Code: <strong>{rc.ccode}</strong>
            </div>
            <div className="cname">
              Course Credit: <strong>{rc.ccredit}</strong>
            </div>
            <div className="cname">
              Course Type: <strong>{rc.ctype}</strong>
            </div>
            <div className="cname">
              semester: <strong>{rc.csem}th</strong>
            </div>
          </div>
        ))}
      </div>
    );
  }
};
