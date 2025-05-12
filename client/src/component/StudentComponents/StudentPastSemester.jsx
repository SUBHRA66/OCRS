import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { CourseList } from "../CourseList";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";

export const StudentPastSemester = () => {
  const student = useSelector((state) => state.student);
  const [courses, setCourses] = useState([]);
  const [creditCount, setCreditCount] = useState({});
  useEffect(() => {
    async function fetchRegisteredCourse() {
      const response = await axios.get(
        BASE_URL + "student/profile/registered-courses",
        { withCredentials: true }
      );
      setCourses(response.data.courses.filter((c) => (c.status == "completed")));
      setCreditCount(response.data.creditCount);
    }
    fetchRegisteredCourse();
  }, []);
  console.log(courses);
  if (!courses || courses.length === 0) {
    return (
      <div className="no-courses">You have not completed any courses yet</div>
    );
  } else {
    return (
      <CourseList
        courses={courses}
        creditCount={creditCount.completedCredit}
        user={student}
      />
    );
  }
};
