import React from "react";
import { useSelector } from "react-redux";

export const StudentOverview = () => {
  const student = useSelector((state) =>state.student);
  // Mock data if props not passed (for demonstration/testing)

  return (
    <div className="student-overview-container">
      <h2>Student Overview</h2>
      <div className="tiles-container">
        <div className="tile profile-tile">
          <h3>Profile</h3>
          <p><strong>Name:</strong> {student.sname}</p>
          <p><strong>Roll No:</strong> {student.rollno}</p>
          <p><strong>Semester:</strong> {student.ssem}</p>
        </div>

        <div className="tile completed-credits-tile">
          <h3>Total Completed Credits</h3>
          <p className="tile-number">56</p>
        </div>

        <div className="tile current-credits-tile">
          <h3>Credits This Semester</h3>
          <p className="tile-number">88</p>
        </div>
      </div>
    </div>
  );
};
