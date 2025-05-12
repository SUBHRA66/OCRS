import { useState, useEffect } from "react";

export const StudentList = ({ students }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredStudents, setFilteredStudents] = useState(students);

  useEffect(() => {
    setFilteredStudents(students); // update when new student data comes
  }, [students]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filteredData = students.filter(
      (std) =>
        std.sname.toLowerCase().includes(query.toLowerCase()) ||
        std.rollno.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredStudents(filteredData);
  };

  return (
    <>
      <div className="search-bar-container" style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Search students..."
          className="search-input"
          style={{
            width: "100%",
            padding: "0.5rem 1rem",
            fontSize: "1rem",
            borderRadius: "8px",
            border: "1px solid #ccc",
            outline: "none",
          }}
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      <div className="course-list">
        {filteredStudents.length > 0 ? (
          filteredStudents.map((student, index) => (
            <div key={index} className="course-item">
              <div className="course-info">
                <div className="course-name">{student.sname}</div>
                <div className="course-code">
                  ROLL NO: <strong>{student.rollno}</strong>
                </div>
                <div className="course-credit">
                  DEPARTMENT: <strong>{student.sdept}</strong>
                </div>
                <div className="course-credit">
                  CGPA: <strong>{student.scgpa}</strong>
                </div>
              </div>
              <button className="modify-button">Modify</button>
            </div>
          ))
        ) : (
          <div style={{ padding: "1rem", color: "gray" }}>
            No students found for "{searchQuery}"
          </div>
        )}
      </div>
    </>
  );
};
