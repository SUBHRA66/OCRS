import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/constants";
import { CourseList } from "../CourseList";
import { useSelector } from "react-redux";
import { CourseModal } from "../CoursesModal";

export const AdminManageCourse = () => {
  const [school, setSchool] = useState("");
  const [department, setDepartment] = useState("");
  const [courses, setCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const admin = useSelector((state) => state.admin);
  useEffect(() => {
    if (school && department) {
      async function getAllCourses(school, department) {
        const response = await axios.post(
          BASE_URL + "admin/get-courses",
          { cschool: school, cdept: department },
          { withCredentials: true }
        );
        console.log(response.data.data);
        setCourses(response.data.data);
      }
      getAllCourses(school, department);
    }
  }, [school, department]);

  const temp = school && department;

  return (
    <div className="admin-manage-course">
      <div className="admin-manage-course-header">
        MANAGE COURSES
        <button className="add-course-button" onClick={()=>setShowModal(true)}>
          ADD COURSE
        </button>
        {showModal && (
          <CourseModal action="add" onClose={() => setShowModal(false)} />
        )}
      </div>

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
        <CourseList courses={courses} user={admin} type={"admin"} />
      ) : (
        <div className="text" style={{ textAlign: "center" }}>
          SELECT SCHOOL AND DEPARTMENT TO BEGIN WITH
        </div>
      )}
    </div>
  );
};
