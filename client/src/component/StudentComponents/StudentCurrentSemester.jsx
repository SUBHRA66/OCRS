import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../utils/constants";

export const StudentCurrentSemester = () => {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    async function fetchRegisteredCourse() {
      const response = await axios.get(
        BASE_URL + "student/profile/registered-courses",
        { withCredentials: true }
      );
      setCourses(response.data.courses);
    }
    fetchRegisteredCourse()
  }, []);
  // console.log(course);
  if (!courses || courses.length === 0) {
    return (
      <div className="no-courses">
        You have not selected any course for this semester yet.
      </div>
    );
  } else {
    return (
      <div className="courses-container">
        {courses.map((item, index) => (
          <div key={index} className="course-item">
            <div className="cname">{item.cname}</div>
            <div className="ccode">{item.ccode}</div>
            <div className="ccredit">Course Credit {item.ccredit}</div>
          </div>
        ))}
      </div>
    );
  }
 return (
  <div className="adkf">adsklfj</div>
 )
};
