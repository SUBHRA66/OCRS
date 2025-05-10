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
      <div className="std-courses-container">
        <div className="std-total-cr-selected">TOTAL CREDIT SELECTED THIS SEMESTER: {56}</div>
        {courses.map((item, index) => (
          <div key={index} className="std-course-item">
            <div className="std-cname">{item.cname}</div>
            <div className="std-ccode">{item.ccode}</div>
            <div className="std-ccredit">Course Credit {item.ccredit}</div>
          </div>
        ))}
      </div>
    );
  }
 return (
  <div className="adkf">adsklfj</div>
 )
};
