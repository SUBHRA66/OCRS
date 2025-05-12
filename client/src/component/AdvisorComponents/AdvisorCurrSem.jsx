import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/constants";
import { useSelector } from "react-redux";
import { CourseList } from "../CourseList";

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
        <CourseList courses={regCourses} user={student} type={"advisor"}/>
      </div>
    );
  }
};
