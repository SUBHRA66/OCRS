import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/constants";
import { StudentList } from "../StudentList";


export const AdminManageStudent = () => {
  const [school, setSchool] = useState("");
  const [department, setDepartment] = useState("");
  const [sem, setSem] = useState("");
  const [students, setStudents] = useState([]);

  useEffect(() => {
    if (school && department) {
      async function getAllStudents(school, department, sem) {
        const s = parseInt(sem);
        const response = await axios.post(
          BASE_URL + "admin/get-students",
          { sschool: school, sdept: department, ssem: s },
          { withCredentials: true }
        );
        setStudents(response.data.data);
      }
      getAllStudents(school, department, sem);
    }
  }, [school, department, sem]);
  const temp = school && department && sem;
  return (
    <div className="admin-manage-course">
      <div className="admin-manage-course-header">MANAGE STUDENT</div>
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

        <select
          className="dropdown-11"
          value={sem}
          onChange={(e) => setSem(e.target.value)}
        >
          <option value="">Select semester</option>
          <option value="1">1st</option>
          <option value="2">2nd</option>
          <option value="3">3rd</option>
          <option value="4">4th</option>
          <option value="5">5th</option>
          <option value="6">6th</option>
          <option value="7">7th</option>
          <option value="8">8th</option>
        </select>
      </div>

      {school && department && sem ? (
        <StudentList students={students} />
      ) : (
        <div className="text">SELECT SCHOOL AND DEPARTMENT TO BEGIN WITH</div>
      )}
    </div>
  );
};