import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/constants";

export const AdminManageFaculty = () => {
  const [school, setSchool] = useState("");
  const [department, setDepartment] = useState("");
  const [faculty, setFaculty] = useState([]);

  useEffect(() => {
    if (school && department) {
      async function getAllFaculties(school, department) {
        const response = await axios.post(
          BASE_URL + "admin/get-faculties",
          { insSchool: school, insDept: department },
          { withCredentials: true }
        );
        setFaculty(response.data.data);
      }
      getAllFaculties(school, department);
    }
  }, [school, department]);
  return (
    <div className="admin-manage-course">
      <div className="admin-manage-course-header">MANAGE FACULTY</div>
      <div className="filter-row">
        <select
          className="dropdown-11"
          value={school}
          onChange={(e) => {
            setSchool(e.target.value);
          }}
        >
          <option value="">Select School</option>
          <option value="Engineering">School of Engineering</option>
          <option value="Sciences">School of Sciences</option>
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
          {faculty.map((faculty, index) => (
            <div key={index} className="course-item">
              <div className="course-info">
                <div className="course-name">{faculty.insName}</div>
                <div className="course-code">
                  DEPARTMENT: <strong>{faculty.insDept}</strong>
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
