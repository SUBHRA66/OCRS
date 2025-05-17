import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { useEffect, useState } from "react";
import {
  addBacklogCourses,
  addCreditCount,
  removeBacklogCourses,
} from "../../slices/courseSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const StudentBacklogCourses = () => {
  const navigate = useNavigate();
  const creditAlreadySelected = useSelector(
    (state) => state.course.creditCount
  );
  const dispatch = useDispatch();
  const [backlogCourses, setBacklogCourses] = useState([]);
  const [selectedBacklogCourses, setSelectedBacklogCourses] = useState([]);
  const [creditCount, setCreditCount] = useState(creditAlreadySelected);
  console.log(creditCount);
  const [saveSelection, setSaveSelection] = useState(false);
  const [sem, setSem] = useState("All");

  useEffect(() => {
    const getBacklogCourses = async () => {
      const response = await axios.get(
        BASE_URL + "student/course-reg/past-courses",
        { withCredentials: true }
      );
      setBacklogCourses(response?.data);
    };
    getBacklogCourses();
  }, []);
  const handleSelectBacklogCourse = (courseCode, courseCredit) => {
    const isNew = !selectedBacklogCourses.includes(courseCode);

    if (isNew) {
      setSelectedBacklogCourses((prev) => [...prev, courseCode]);
      setCreditCount((prev) => prev + courseCredit);

      const course = backlogCourses.find((c) => c.ccode === courseCode);
      if (course) {
        dispatch(addBacklogCourses(course));
      }
      dispatch(addCreditCount(courseCredit));
    }
  };
  console.log(creditCount);

  const handleRemoveBacklogCourses = (courseCode, courseCredit) => {
    setSelectedBacklogCourses((prev) =>
      prev.filter((code) => code !== courseCode)
    );

    setCreditCount((prev) => prev - courseCredit);
    dispatch(removeBacklogCourses(courseCode));
    dispatch(removeCreditCount(courseCredit));
  };

  console.log(sem);
  if (backlogCourses.length)
    return (
      <div className="backlog-container">
        <h2 className="backlog-title" style={{ textAlign: "center" }}>
          PREVIOUS SEMESTER COURSES
        </h2>
        <div className="semester-filter">
          <label>Filter by Semester:</label>
          <select value={sem} onChange={(e) => setSem(e.target.value)}>
            <option value="All">All</option>
            <option value="1">Semester 1</option>
            <option value="2">Semester 2</option>
            <option value="3">Semester 3</option>
            <option value="4">Semester 4</option>
            <option value="5">Semester 5</option>
            <option value="6">Semester 6</option>
            <option value="7">Semester 7</option>
            {/* Add more if needed */}
          </select>
        </div>
        <div className="course-reg-container">
          <h1 className="course-reg-heading">
            TOTAL CREDIT SELECTED: {creditCount}
          </h1>
          <ul className="course-list">
            {saveSelection ? (
              <div className="sabretooth">
                {backlogCourses
                  .filter(
                    (bc) => sem === "All" || String(bc.csem) === String(sem)
                  )
                  .map((course) => (
                    <li key={course.ccode} className="course-item">
                      <div className="course-details">
                        <h3 className="course-name">{course.cname}</h3>
                        <p className="course-info">
                          Credit: {course.ccredit} | Code: {course.ccode} |
                          Type: {course.ctype} | Semester: {course.csem}
                        </p>
                      </div>
                      <div className="course-actions">
                        {selectedBacklogCourses.includes(course.ccode) ? (
                          <button className="invalid-btn">Remove Course</button>
                        ) : (
                          <button className="invalid-btn">
                            Select This Course
                          </button>
                        )}
                      </div>
                    </li>
                  ))}
              </div>
            ) : (
              <div className="sabretooth">
                {backlogCourses
                  .filter(
                    (bc) => sem === "All" || String(bc.csem) === String(sem)
                  )
                  .map((course) => (
                    <li key={course.ccode} className="course-item">
                      <div className="course-details">
                        <h3 className="course-name">{course.cname}</h3>
                        <p className="course-info">
                          Credit: {course.ccredit} | Code: {course.ccode} |
                          Type: {course.ctype} | Semester: {course.csem}
                        </p>
                      </div>
                      <div className="course-actions">
                        {selectedBacklogCourses.includes(course.ccode) ? (
                          <button
                            className="remove-course-btn selected"
                            onClick={() =>
                              handleRemoveBacklogCourses(
                                course.ccode,
                                course.ccredit
                              )
                            }
                          >
                            Remove Course
                          </button>
                        ) : (
                          <button
                            className="select-course-btn"
                            onClick={() =>
                              handleSelectBacklogCourse(
                                course.ccode,
                                course.ccredit
                              )
                            }
                          >
                            Select This Course
                          </button>
                        )}
                      </div>
                    </li>
                  ))}
              </div>
            )}
          </ul>
          {saveSelection ? (
            <button
              className="save-edit-btn"
              onClick={() => {
                setSaveSelection(false);
              }}
            >
              EDIT COURSE SELECTION
            </button>
          ) : (
            <button
              className="save-edit-btn"
              onClick={() => {
                setSaveSelection(true);
              }}
            >
              SAVE COURSE SELECTION
            </button>
          )}
          <button className="backlog-courses-btn" onClick={()=>navigate(-1)}>BACK</button>
        </div>
      </div>
    );
  else {
    return (
      <div className="backlog-container">
        <h2 className="backlog-title" style={{ textAlign: "center" }}>
          You do not have any backlog courses
        </h2>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button className="backlog-courses-btn" onClick={()=> navigate(-1)}>BACK</button>
        </div>
      </div>
    );
  }
};
