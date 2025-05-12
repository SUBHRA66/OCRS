import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addSelectedCourses,
  clearAllCourseState,
  removeCourses,
  removeSelectedCourse,
} from "../../slices/courseSlice";
import { BASE_URL } from "../../utils/constants";
import { ToastMessage } from "../ToastMessage";
import { toast, ToastContainer } from "react-toastify";

const getCourses = async () => {
  const response = await axios.get(BASE_URL + "student/course-reg/courses", {
    withCredentials: true,
  });
  return response;
};

//course registration page component
export const StudentCourseRegistration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedCourses, setSelectedCourses] = useState([]); //SELECTED COURSE IN THE PORTAL, for Redux
  const [creditCount, setCreditCount] = useState(0);
  const [COURSES, setCourses] = useState([]); // ALL THE COURSES
  const [preExistingCourse, setPreExistingCourse] = useState([]); // temp array to store courses
  const [saveSelection, setSaveSelection] = useState(false); // SAVE SELECTION FLAG
  const [sendRequest, setSendRequest] = useState(false); // REG REQUEST SENT FLAG
  const [flag, setFlag] = useState(false);
  const [requested, setRequested] = useState(false);
  const [rejected, setRejected] = useState(false);
  const [approved, setApproved] = useState(false);
  const [msg, setMsg] = useState("");

  const displayMsg = (msg) => {
    console.log("inside display msg");
    console.log(msg);
  };
  const bc = useSelector((state) => state.course.backlogCourses);

  const backlogCourses = bc.map((bc) => bc.ccode);
  console.log(backlogCourses);

  useEffect(() => {
    async function checkRegReq() {
      const response = await axios.get(
        BASE_URL + "student/course-reg/course-regreq",
        {
          withCredentials: true,
        }
      );
      setRejected(false);
      setApproved(false);
      setRequested(false);
      const requestedCourses = response.data.rows;
      console.log(requestedCourses)
      if (requestedCourses.length > 0) {
        const { status } = requestedCourses[0];
        setFlag(true);
        setPreExistingCourse(requestedCourses);
        if (status == "requested") {
          setRequested(true);
        } else if (status == "rejected") {
          setRejected(true);
        } else if (status == "approved") {
          setApproved(true);
        }
      } else {
        setFlag(false);
        const response = await axios.get(
          BASE_URL + "student/course-reg/courses",
          { withCredentials: true }
        );
        setCourses(response.data.courses);
      }
    }
    checkRegReq();
    console.log("inside useEffect");
  }, [flag]);

  const handleSelectCourse = (courseCode, courseCredit) => {
    setSelectedCourses((prevSelectedCourses) => {
      if (!prevSelectedCourses.includes(courseCode)) {
        setCreditCount((prev) => prev + courseCredit);

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
      setCreditCount((prev) => prev - courseCredit);
      dispatch(removeSelectedCourse(courseCode));
      return prevSelectedCourses.filter((code) => code !== courseCode);
    });
  };

  const backlogCoursesHandler = async () => {
    return navigate("/student/course-registration/backlog-courses");
  };

  const sendRegRequestHandler = async () => {
    console.log("-------------------------");
    console.log(backlogCourses);
    let message, response;
    if (backlogCourses.length > 0) {
      const allCourses = [...selectedCourses, ...backlogCourses];
      console.log("DAARU PEEKE AA GAYA");
      console.log(allCourses);
      response = await axios.post(
        BASE_URL + "student/course-reg/course-selection",
        {
          ccodes: allCourses,
        },
        {
          withCredentials: true,
        }
      );
      message = response.data.message;
    } else {
      response = await axios.post(
        BASE_URL + "student/course-reg/course-selection",
        {
          ccodes: selectedCourses,
        },
        {
          withCredentials: true,
        }
      );
      message = response.data.message;
    }
    setFlag(true);
    setMsg(message);
    console.log(message);
    console.log(msg);
    displayMsg(msg);
  };

  const HandleRequestAgain = async () => {
    dispatch(clearAllCourseState());
    const response = await axios.post(
      BASE_URL + "student/course-reg/delete-regreq",
      {},
      {
        withCredentials: true,
      }
    );
    setFlag(false);
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
        <button
          className="backlog-courses-btn"
          onClick={() => {
            sendRegRequestHandler();
          }}
        >
          {sendRequest ? "RE-SELECT COURSES" : "SEND SELECTION REQUEST"}
        </button>
      </div>
    );
  } else if (flag) {
    return (
      <div className="already-requested-container">
        <div className="already-requested"  >
          <p style={{color: "grey"}}>REQUEST SENT</p>
          {approved ? (
            <p style={{color: "green", textAlign: "center"}} ><strong>YOUR COURSE REGISTRATION REQUEST HAS BEEN APPROVED</strong></p>
          ) : rejected ? (
            <p style={{color: "red", textAlign: "center"}}><stong>REGISTRATION REQUEST REJECTED BY THE ADVISOR</stong></p>
          ) : (
            <p style={{color: "#1cb0e3", textAlign: "center"}}><strong>REGISTRATION REQUEST YET TO BE APPROVED BY THE ADVISOR</strong></p>
          )}
          <button className="request-again" onClick={HandleRequestAgain}>
            SEND REQUEST AGAIN
          </button>
        </div>
        <hr className="divider" />
        <div className="courses-list">
          {approved ? (
            <h1>YOUR APPROVED COURSES</h1>
          ) : (
            <h1 style={{textAlign:"center"}}>YOUR REQUESTED COURSES</h1>
          )}
          {preExistingCourse.map((course, index) => (
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
