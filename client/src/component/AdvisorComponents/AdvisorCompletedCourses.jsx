import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/constants";
import { useSelector } from "react-redux";
import { CourseList } from "../CourseList";

export const AdvisorCompletedCourses = () => {
  const student = useSelector((state) => state.student);
  const rollno = student.rollno;
  const [regCourses, setRegCourses] = useState([]);
  const [creditCount, setCreditCount] = useState(0);
  useEffect(() => {
    async function registeredCourses(rollno) {
      const response = await axios.post(
        BASE_URL + "advisor/course-reg/reg-courses/" + rollno,
        {},
        { withCredentials: true }
      );
      setRegCourses(response.data.data.filter((c) => c.status == "completed"));
      setCreditCount(response.data.credit.completedCredit);
      console.log(regCourses);
    }
    registeredCourses(rollno);
  }, []);
  console.log(regCourses);
  if (regCourses.length == 0) {
    return (
      <div className="">
        <h2>{student.sname} has not completed any courses yet</h2>
      </div>
    );
  } else {
    return (
      <div className="lala">
        <h2>
          <em>COMPLETED COURSES BY {student.sname}</em>
        </h2>
        <CourseList
          courses={regCourses}
          creditCount={creditCount}
          user={student}
          type={"advisor"}
        />
      </div>
    );
  }
};
