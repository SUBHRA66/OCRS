import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/constants";

export const AdminManageCourse = () => {
  const [school, setSchool] = useState("");
  const [department, setDepartment] = useState("");
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    if (school && department) {
      async function getAllCourses(school, department) {
        const response = await axios.post(
          BASE_URL + "admin/get-courses",
          { cschool: school, cdept: department },
          { withCredentials: true }
        );
        setCourses(response.data.data);
      }
      getAllCourses(school, department);
    }
  }, [school, department]);
  const temp = school && department;

  const onClickHander = () => {};
  return (
    <div className="admin-manage-course">
      <div className="admin-manage-course-header">MANAGE COURSES</div>
      <div className="filter-row">
        <select
          className="dropdown-11"
          value={school}
          onChange={(e) => {
            setSchool(e.target.value);
          }}
        >
          <option value="">Select School</option>
          <option value="SOE">School of Engineering</option>
          <option value="SOS">School of Sciences</option>
        </select>

        <select
          className="dropdown-11"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        >
          <option value="">Select Department</option>
          <option value="CSE">Computer Science and Engineering</option>
          <option value="EE">Electrical Engineering</option>
        </select>
      </div>

      {school && department ? (
        <div className="course-list">
          {courses.map((course, index) => (
            <div key={index} className="course-item">
              <div className="course-info">
                <div className="course-name">{course.cname}</div>
                <div className="course-code">
                  Course Code: <strong>{course.ccode}</strong>
                </div>
                <div className="course-credit">
                  Credits: <strong>{course.ccredit}</strong>
                </div>
              </div>
              <button className="modify-button">Modify</button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text">SELECT SCHOOL AND DEPARTMENT TO BEGIN WITH</div>
      )}
    </div>
  );
};
