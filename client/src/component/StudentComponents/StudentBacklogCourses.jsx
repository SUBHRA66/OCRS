import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { useEffect, useState } from "react";
import { addBacklogCourses, removeBacklogCourses } from "../../slices/courseSlice";
import { useDispatch } from "react-redux";

export const StudentBacklogCourses = () => {
  const dispatch = useDispatch();
  const [backlogCourses, setBacklogCourses] = useState([]);
  const [selectedBacklogCourses, setSelectedBacklogCourses] = useState([]);
  const [creditCount, setCreditCount] = useState([]);
  const [saveSelection, setSaveSelection] = useState(false);
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

  //backlogCourses is the array holding all the backlog courses for the semester

  const handleSelectBacklogCourse = (courseCode, courseCredit) => {
    setSelectedBacklogCourses((prevSelectedBacklogCourses) => {
      if (!prevSelectedBacklogCourses.includes(courseCode)) {
        setCreditCount(creditCount + courseCredit);
        dispatch(
          addBacklogCourses(backlogCourses.find((c) => c.ccode === courseCode))
        );
        return [...prevSelectedBacklogCourses, courseCode]; //spread and rest
      }
      return prevSelectedBacklogCourses;
    });
  };

  const handleRemoveBacklogCourses = (courseCode, courseCredit) => {
    setSelectedBacklogCourses((prevSelectedBacklogCourses) => {
      setCreditCount(creditCount - courseCredit);
      dispatch(removeBacklogCourses(courseCode));
      return prevSelectedBacklogCourses.filter((code) => code !== courseCode);
    });
  };
  return (
    <div className="backlog-container">
      <h2 className="backlog-title">PREVIOUS SEMESTER COURSES</h2>

      <div className="semester-filter">
        <label>Filter by Semester:</label>
        <select onChange={(e) => setSelectedSemester(e.target.value)}>
          <option value="All">All</option>
          <option value="1">Semester 1</option>
          <option value="2">Semester 2</option>
          <option value="3">Semester 3</option>
          {/* Add more if needed */}
        </select>
      </div>
      <div className="course-reg-container">
        <h1 className="course-reg-heading">CURRENT SEMESTER COURSES</h1>
        <h1 className="course-reg-heading">TOTAL CREDIT SELECTED:</h1>
        <ul className="course-list">
          {saveSelection ? (
            <div className="sabretooth">
              SAVE SELECTION TRUE
              {backlogCourses.map((course) => (
                <li key={course.ccode} className="course-item">
                  <div className="course-details">
                    <h3 className="course-name">{course.cname}</h3>
                    <p className="course-info">
                      Credit: {course.ccredit} | Code: {course.ccode} | Type:{" "}
                      {course.ctype} | Semester: {course.csem}
                    </p>
                  </div>
                  <div className="course-actions">
                    {selectedBacklogCourses.includes(course.ccode) ? (
                      <button className="invalid-btn">
                        Remove Course
                      </button>
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
              SAVE SELECTION FALSE
              {backlogCourses.map((course) => (
                <li key={course.ccode} className="course-item">
                  <div className="course-details">
                    <h3 className="course-name">{course.cname}</h3>
                    <p className="course-info">
                      Credit: {course.ccredit} | Code: {course.ccode} | Type:{" "}
                      {course.ctype} | Semester: {course.csem}
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
        <button className="backlog-courses-btn">BACK</button>
      </div>
    </div>
  );
};