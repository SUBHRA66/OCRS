import axios, { all } from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { addSelectedCourses, removeSelectedCourse } from "../courseSlice";

const getCourses = async () => {
  const response = await axios.get(BASE_URL + "student/course-reg/courses", {
    withCredentials: true,
  });
  return response;
};

//course registration page component
export const CourseRegistration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedCourses, setSelectedCourses] = useState([]); //SELECTED COURSE IN THE PORTAL, for Redux
  const [creditCount, setCreditCount] = useState(0);
  const [COURSES, setCourses] = useState([]); // ALL THE COURSES
  const [tempCourses, setTempCourses] = useState([]); // temp array to store courses
  const [saveSelection, setSaveSelection] = useState(false); // SAVE SELECTION FLAG
  const [sendRequest, setSendRequest] = useState(false); // REG REQUEST SENT FLAG
  const [flag, setFlag] = useState(false);

  const bc = useSelector((state) => state.course.backlogCourses);
  const backlogCourses = bc.map((bc) => bc.ccode);
  console.log(backlogCourses);
  useEffect(() => {
    async function ifExists() {
      const response = await axios.get(
        BASE_URL + "student/course-reg/course-regreq",
        {
          withCredentials: true,
        }
      );
      const requestedCourses = response.data.rows;
      if (requestedCourses.length) {
        setFlag(true);
        setTempCourses(requestedCourses);
      } else {
        setFlag(false);
      }
    }
    ifExists();
    if (!flag) {
      async function fetchCourses() {
        const response = await getCourses();
        setCourses(response.data.courses); // Save data to state
      }
      fetchCourses();
    }
    console.log("inside useEffect");
  }, [flag]);

  const handleSelectCourse = (courseCode, courseCredit) => {
    setSelectedCourses((prevSelectedCourses) => {
      if (!prevSelectedCourses.includes(courseCode)) {
        setCreditCount(creditCount + courseCredit);
        /* setTempCourses((prevTempCourses) => [
          ...prevTempCourses,
          COURSES.find((c) => c.ccode === courseCode),
        ]); */
        dispatch(
          addSelectedCourses(COURSES.find((c) => c.ccode === courseCode))
        );
        return [...prevSelectedCourses, courseCode]; //spread and rest
      }
      return prevSelectedCourses;
    });
  };

  const handleRemoveCourse = (courseCode, courseCredit) => {
    setSelectedCourses((prevSelectedCourses) => {
      setCreditCount(creditCount - courseCredit);
      dispatch(removeSelectedCourse(courseCode));
      return prevSelectedCourses.filter((code) => code !== courseCode);
    });
  };

  const backlogCoursesHandler = async () => {
    return navigate("/student/course-registration/backlog-courses");
  };

  const sendRegRequestHandler = async () => {
    if (sendRequest) {
      // setSendRequest(false);
    } else {
      if (backlogCourses.length) {
        const allCourses = [...selectedCourses, ...backlogCourses];

        await axios.post(
          BASE_URL + "student/course-reg/course-selection",
          {
            ccodes: allCourses,
          },
          {
            withCredentials: true,
          }
        );
      } else {
        await axios.post(
          BASE_URL + "student/course-reg/course-selection",
          {
            ccodes: selectedCourses,
          },
          {
            withCredentials: true,
          }
        );
      }

      // setSendRequest(true);
      setFlag(true);
    }
  };

  const HandleRequestAgain = async () => {
    const response = await axios.post(
      BASE_URL + "student/course-reg/delete-regreq",
      {},
      {
        withCredentials: true,
      }
    );
    setFlag(false);
    // setSendRequest(false);
    setSaveSelection(false);
    setSelectedCourses([]);
  };
  if (!flag) {
    return (
      <div className="course-reg-container">
        <h1 className="course-reg-heading">CURRENT SEMESTER COURSES</h1>
        <h1 className="course-reg-heading">
          TOTAL CREDIT SELECTED: {creditCount}
        </h1>
        {saveSelection ? (
          <h2 className="course-reg-heading">COURSE SELECTION SAVED</h2>
        ) : (
          <h2 className="course-reg-heading">SELECT COURSES</h2>
        )}
        <ul className="course-list">
          {saveSelection ? (
            <div className="sabretooth">
              {COURSES.map((course) => (
                <li key={course.ccode} className="course-item">
                  <div className="course-details">
                    <h3 className="course-name">{course.cname}</h3>
                    <p className="course-info">
                      Credit: {course.ccredit} | Code: {course.ccode} | Type:{" "}
                      {course.ctype}
                    </p>
                  </div>
                  <div className="course-actions">
                    {selectedCourses.includes(course.ccode) ? (
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
              {COURSES.map((course) => (
                <li key={course.ccode} className="course-item">
                  <div className="course-details">
                    <h3 className="course-name">{course.cname}</h3>
                    <p className="course-info">
                      Credit: {course.ccredit} | Code: {course.ccode} | Type:{" "}
                      {course.ctype}
                    </p>
                  </div>
                  <div className="course-actions">
                    {selectedCourses.includes(course.ccode) ? (
                      <button
                        className={
                          sendRequest ? "invalid-btn" : "remove-course-btn"
                        }
                        onClick={() =>
                          handleRemoveCourse(course.ccode, course.ccredit)
                        }
                      >
                        Remove Course
                      </button>
                    ) : (
                      <button
                        className={
                          sendRequest ? "invalid-btn" : "select-course-btn"
                        }
                        onClick={() =>
                          handleSelectCourse(course.ccode, course.ccredit)
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
        <button
          className={sendRequest ? "invalid-button" : "save-edit-btn"}
          onClick={backlogCoursesHandler}
        >
          REGISTER BACKLOG COURSES
        </button>
        {saveSelection ? (
          <button
            className={sendRequest ? "invalid-button" : "save-edit-btn"}
            onClick={() => {
              setSaveSelection(false);
            }}
          >
            EDIT COURSE SELECTION
          </button>
        ) : (
          <button
            className={sendRequest ? "invalid-button" : "save-edit-btn"}
            onClick={() => {
              setSaveSelection(true);
            }}
          >
            SAVE COURSE SELECTION
          </button>
        )}
        <button className="backlog-courses-btn" onClick={sendRegRequestHandler}>
          {sendRequest ? "RE-SELECT COURSES" : "SEND SELECTION REQUEST"}
        </button>
      </div>
    );
  } else {
    return (
      <div className="already-requested-container">
        <div className="already-requested">
          REQUEST SENT
          <button className="request-again" onClick={HandleRequestAgain}>
            SEND REQUEST AGAIN
          </button>
        </div>
        {/* Add a horizontal line */}
        <hr className="divider" />
        {/* Courses display */}
        <div className="courses-list">
          <h1>YOUR REQUESTED COURSES</h1>
          {tempCourses.map((course, index) => (
            <div key={index} className="course-card">
              <h4 className="course-name">{course.cname}</h4>
              <p className="course-details">
                Code: {course.ccode} | Credits: {course.ccredit} | Type:{" "}
                {course.ctype}
              </p>
              <hr className="divider" />
            </div>
          ))}
        </div>
      </div>
    );
  }
};
