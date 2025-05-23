import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../utils/constants";
import { CourseList } from "../CourseList";

export const StudentCurrentSemester = () => {
  const student = useSelector((state) => state.student);
  const [courses, setCourses] = useState([]);
  const [creditCount, setCreditCount] = useState({});
  useEffect(() => {
    async function fetchRegisteredCourse() {
      const response = await axios.get(
        BASE_URL + "student/profile/registered-courses",
        { withCredentials: true }
      );
      setCourses(response.data.courses.filter((c) => (c.status == "enrolled")));
      setCreditCount(response.data.creditCount);
    }
    fetchRegisteredCourse();
  }, []);
  console.log(courses);
  if (!courses || courses.length === 0) {
    return (
      <div className="no-courses">
        You have not selected any course for this semester yet.
      </div>
    );
  } else {
    return (
      <CourseList courses={courses} creditCount={creditCount.enrolledCredit} user={student} />
    );
  }
};
