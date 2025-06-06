import { useState } from "react";
import { CourseModal } from "./CoursesModal";

export const CourseList = ({ courses, creditCount, user, type }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [filteredCourses, setFilteredCourses] = useState(courses);
  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = courses.filter(
      (course) =>
        course.cname.toLowerCase().includes(query.toLowerCase()) ||
        course.ccode.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCourses(filtered);
  };
  const ModifyCourseHandler = (course) => {
    setShowModal(true);
    setSelectedCourse(course);
  };
  console.log(courses);
  return (
    <>
      <div className="std-courses-container">
        {type == "faculty" ? (
          <div className="std-total-cr-selected">
            Total Credit: {creditCount}
          </div>
        ) : type == "admin" ? (
          <div
            className="search-bar-container"
            style={{ marginBottom: "1rem" }}
          >
            <input
              type="text"
              placeholder="Search courses..."
              className="search-input"
              style={{
                width: "100%",
                padding: "0.5rem 1rem",
                fontSize: "1rem",
                borderRadius: "8px",
                border: "1px solid #ccc",
                outline: "none",
              }}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        ) : type != "advisor" ? (
          <div className="std-total-cr-selected">
            Total Credit: {creditCount}
          </div>
        ) : (
          <div className=""></div>
        )}
        <div className="jikunu">
          {(filteredCourses.length > 0 ? filteredCourses : courses).map(
            (item, index) => (
              <div key={index} className="std-course-item">
                <div className="std-cname">{item.cname}</div>
                <div className="std-ccode">
                  Course Code: <strong>{item.ccode}</strong>{" "}
                </div>
                <div className="std-ccredit">
                  Course Credit <strong>{item.ccredit}</strong>
                </div>
                <div className="std-ccredit">
                  Semester <strong>{item.csem}</strong>
                </div>
                {type == "faculty" && (
                  <button className="course-button">See students</button>
                )}
                {type == "admin" && (
                  <button
                    className="course-button"
                    onClick={() => ModifyCourseHandler(item)}
                  >
                    Modify
                  </button>
                )}
              </div>
            )
          )}
        </div>
        {showModal && (
          <CourseModal
            course={selectedCourse} 
            onClose={() => setShowModal(false)}
          />
        )}
      </div>
    </>
  );
};