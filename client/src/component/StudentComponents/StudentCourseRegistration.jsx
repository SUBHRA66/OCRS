import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addCreditCount,
  addElectiveCourses,
  addOpenElectiveCourses,
  addSelectedCourses,
  clearAllCourseState,
  removeSelectedCourse,
} from "../../slices/courseSlice";
import { BASE_URL } from "../../utils/constants";

//course registration page component
export const StudentCourseRegistration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedCourses, setSelectedCourses] = useState([]); //SELECTED COURSE IN THE PORTAL, for Redux
  const [COURSES, setCourses] = useState([]); // ALL THE COURSES
  const [electiveCourses, setElectiveCourses] = useState([]);
  const [openElectiveCourse, setOpenElectiveCourses] = useState([]);
  const [preExistingCourse, setPreExistingCourse] = useState([]); // temp array to store courses
  const [saveSelection, setSaveSelection] = useState(false); // SAVE SELECTION FLAG
  const [sendRequest, setSendRequest] = useState(false); // REG REQUEST SENT FLAG
  const [flag, setFlag] = useState(false);
  const [requested, setRequested] = useState(false);
  const [rejected, setRejected] = useState(false);
  const [approved, setApproved] = useState(false);
  const [maxElecCourses, setMaxElecCourses] = useState(0);
  const [maxElecCredit, setMaxElecCredit] = useState(0);
  const [maxOpenElecCourses, setMaxOpenElecCourses] = useState(0);
  const [maxOpenElecCredit, setMaxOpenElecCredit] = useState(0);
  const [selectedElectiveCourse, setSelectedElectiveCourse] = useState(
    Array(maxElecCourses).fill("")
  );
  const [dropdownSelect, setDropdownSelect] = useState(
    Array(maxElecCourses).fill("")
  );
  const [msg, setMsg] = useState("");
  const creditAlreadySelected = useSelector(
    (state) => state.course.creditCount
  );
  const [selectedOpenElectiveCourse, setSelectedOpenElectiveCourse] = useState(
    Array(maxOpenElecCourses).fill("")
  );
  const [openDropdownSelect, setOpenDropdownSelect] = useState(
    Array(maxOpenElecCourses).fill("")
  );
  console.log(creditAlreadySelected);
  const [creditCount, setCreditCount] = useState(creditAlreadySelected);
  console.log(creditAlreadySelected);

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
      console.log(requestedCourses);
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
        const lala = await axios.get(
          BASE_URL + "student/course-reg/elective-courses",
          { withCredentials: true }
        );
        setMaxElecCredit(lala?.data?.maxElectiveCredit);
        setMaxElecCourses(lala?.data?.maxElective);
        setElectiveCourses(lala?.data?.data);
        const result = await axios.get(
          BASE_URL + "student/course-reg/open-elective-courses",
          { withCredentials: true }
        );
        console.log(result);
        setOpenElectiveCourses(result?.data?.data);
        setMaxOpenElecCourses(result?.data?.maxOpenElective);
        setMaxOpenElecCredit(result?.data?.maxOpenElectiveCredit);
      }
    }
    checkRegReq();
    console.log("inside useEffect");
  }, [flag]);

  console.log(openElectiveCourse);
  console.log(maxOpenElecCourses);
  console.log(maxOpenElecCredit);
  const handleSelectCourse = (courseCode, courseCredit) => {
    if (!selectedCourses.includes(courseCode)) {
      setSelectedCourses((prev) => [...prev, courseCode]);
      setCreditCount((prev) => prev + courseCredit);

      const selectedCourse = COURSES.find((c) => c.ccode === courseCode);
      if (selectedCourse) {
        dispatch(addSelectedCourses(selectedCourse));
      }
      dispatch(addCreditCount(courseCredit));
    }
  };

  const handleRemoveCourse = (courseCode, courseCredit) => {
    setSelectedCourses((prevSelectedCourses) => {
      setCreditCount((prev) => prev - courseCredit);
      dispatch(removeSelectedCourse(courseCode));
      return prevSelectedCourses.filter((code) => code !== courseCode);
    });
  };

  const handleSelectElectiveCourse = async (courseCode) => {
    const c = electiveCourses.find((ec) => ec.ccode == courseCode);
    console.log(c.ccredit)
    setCreditCount((prev)=>prev + c.ccredit)
    dispatch(addElectiveCourses(c));
    dispatch(addCreditCount(c.ccredit));
  };

  const handleSelectOpenElectiveCourse = (courseCode) => {
    const c = openElectiveCourse.find((ec) => ec.ccode == courseCode);
    console.log(c);
    setCreditCount((prev) => prev + c.ccredit);
    dispatch(addOpenElectiveCourses(c));
    dispatch(addCreditCount(c.ccredit));
  };

  console.log(selectedOpenElectiveCourse);




  const backlogCoursesHandler = async () => {
    return navigate("/student/course-registration/backlog-courses");
  };

  const sendRegRequestHandler = async () => {
    let allCourses, message, response;
    if (
      selectedElectiveCourse.length > 0 &&
      backlogCourses.length > 0 &&
      selectedOpenElectiveCourse.length > 0
    ) {
      allCourses = [
        ...selectedCourses,
        ...selectedElectiveCourse,
        ...selectedOpenElectiveCourse,
        ...backlogCourses
      ];
      console.log(allCourses);
    } else if (selectedElectiveCourse.length > 0 && selectedOpenElectiveCourse > 0) {
      allCourses = [...selectedCourses, ...selectedElectiveCourse, ...selectedOpenElectiveCourse];
      console.log(allCourses);
    } else if (selectedElectiveCourse.length > 0) {
      allCourses = [...selectedCourses, ...selectedElectiveCourse];
      console.log(allCourses);
    } else {
      allCourses = [...selectedCourses];
    }

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
    setFlag(true);
    setMsg(message);
    console.log(message);
    console.log(msg);
    displayMsg(msg);
  };

  const HandleRequestAgain = async () => {
    setCreditCount(0);
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
        <button
          onClick={() => {
            dispatch(clearAllCourseState());
            setCreditCount(0);
          }}
        >
          RESET
        </button>
        <h1 className="course-reg-heading" style={{ margin: 5 }}>
          CURRENT SEMESTER COURSES
        </h1>
        <h1 className="course-reg-heading" style={{ margin: 5 }}>
          TOTAL CREDIT SELECTED: {creditCount}
        </h1>
        {saveSelection ? (
          <h2 className="course-reg-heading" style={{ margin: 0 }}>
            COURSE SELECTION SAVED
          </h2>
        ) : (
          <h3 className="course-reg-heading" style={{ margin: 0 }}>
            SELECT COURSES
          </h3>
        )}

        {/* ELECTIVE courses dropdown container */}

        <div className="elective-course-container">
          <ul>
            {Array.from({ length: maxElecCourses }).map((_, index) => (
              <li key={index} className="course-item">
                <select
                  value={dropdownSelect[index] || ""}
                  onChange={(e) => {
                    const selectedValue = e.target.value;
                    handleSelectElectiveCourse(selectedValue);

                    setDropdownSelect((prev) => {
                      const updated = [...prev];
                      updated[index] = selectedValue;
                      return updated;
                    });

                    setSelectedElectiveCourse((prev) => {
                      const updated = [...prev];
                      updated[index] = selectedValue;
                      return updated;
                    });
                  }}
                  className="ronga"
                >
                  <option value="">SELECT PROGRAM ELECTIVE {index + 1}</option>
                  {electiveCourses
                    .filter(
                      (ec) =>
                        !selectedElectiveCourse.includes(ec.ccode) ||
                        selectedElectiveCourse[index] === ec.ccode // allow the selected one to remain
                    )
                    .map((ec) => (
                      <option key={ec.ccode} value={ec.ccode}>
                        {ec.cname}
                      </option>
                    ))}
                </select>
              </li>
            ))}
          </ul>
        </div>

        {/* OPEN ELECTIVE COURSES DROPDOWN */}
        <div className="open-elective-course-container">
          <ul>
            {Array.from({ length: maxOpenElecCourses }).map((_, index) => (
              <li key={index} className="course-item">
                <select
                  value={openDropdownSelect[index] || ""}
                  onChange={(e) => {
                    const selectedValue = e.target.value;
                    handleSelectOpenElectiveCourse(selectedValue);

                    setOpenDropdownSelect((prev) => {
                      const updated = [...prev];
                      updated[index] = selectedValue;
                      return updated;
                    });

                    setSelectedOpenElectiveCourse((prev) => {
                      const updated = [...prev];
                      updated[index] = selectedValue;
                      return updated;
                    });
                  }}
                  className="ronga"
                >
                  <option value="">SELECT OPEN ELECTIVE {index + 1}</option>
                  {openElectiveCourse
                    .filter(
                      (oc) =>
                        !selectedOpenElectiveCourse.includes(oc.ccode) ||
                        selectedOpenElectiveCourse[index] === oc.ccode
                    )
                    .map((oc) => (
                      <option key={oc.ccode} value={oc.ccode}>
                        {oc.cname}
                      </option>
                    ))}
                </select>
              </li>
            ))}
          </ul>
        </div>
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
        <div className="already-requested">
          <p style={{ color: "grey" }}>REQUEST SENT</p>
          {approved ? (
            <p style={{ color: "green", textAlign: "center" }}>
              <strong>
                YOUR COURSE REGISTRATION REQUEST HAS BEEN APPROVED
              </strong>
            </p>
          ) : rejected ? (
            <p style={{ color: "red", textAlign: "center" }}>
              <stong>REGISTRATION REQUEST REJECTED BY THE ADVISOR</stong>
            </p>
          ) : (
            <p style={{ color: "#1cb0e3", textAlign: "center" }}>
              <strong>
                REGISTRATION REQUEST YET TO BE APPROVED BY THE ADVISOR
              </strong>
            </p>
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
            <h1 style={{ textAlign: "center" }}>YOUR REQUESTED COURSES</h1>
          )}
          {preExistingCourse.map((course, index) => (
            <div key={index} className="course-card">
              <h4 className="course-name">{course.cname}</h4>
              <p className="course-info">
                Credit: {course.ccredit} | Code: {course.ccode} | Type:{" "}
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
