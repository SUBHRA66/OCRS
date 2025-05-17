import { useEffect, useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { ToastMessage } from "./ToastMessage";
import { ToastContainer, toast } from "react-toastify";
import validator from "validator";

Modal.setAppElement("#root");


export const CourseModal = ({ action, course, onClose }) => {

  const [submitted, setSubmitted] = useState(false);
  const [callFaculty, setCallFaculty] = useState(true);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedCode, setUpdatedCode] = useState(null);
  const [updatedType, setUpdatedType] = useState(null);
  const [updatedSemester, setUpdatedSemester] = useState(null);
  const [updatedInstructor, setUpdatedInstructor] = useState(null);
  const [updatedStructure, setUpdatedStructure] = useState({
    cl: null,
    ct: null,
    cp: null,
  });
  const [instructors, setInstructors] = useState([]);
  useEffect(() => {
    async function fetchFaculties() {
      const response = await axios.post(
        BASE_URL + "admin/get-faculties",
        { insSchool: "SOE", insDept: "CSE" },
        {
          withCredentials: true,
        }
      );
      console.log(response);
      setInstructors(response.data.data);
    }
    fetchFaculties();
  }, []);

  const submitButtonHandler = async (currentCode) => {
    setSubmitted(true);
    const payload = {
      currentCode,
      updatedName,
      updatedCode,
      updatedType,
      updatedSemester,
      updatedInstructor,
      updatedStructure,
    };
    if (action != "add") {
      const response = await axios.post(
        BASE_URL + "admin/update-course",
        payload,
        { withCredentials: true }
      );
      console.log(response.data);
    } else {
      const response = await axios.post(
        BASE_URL + "admin/add-course",
        payload,
        { withCredentials: true }
      );
      console.log(response.data);
    }

    displayMsg();
  };

  const addCourseHandler = () => {
    console.log("ADD COURSE HANDLER");
  };

  return (
    <>
      <Modal
        isOpen={onClose} // Bind this to the 'close' state
        // onRequestClose={() => setClose(false)} // Close modal on outside click or escape
        contentLabel="Example Modal"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <div className="update-course-container">
          {action == "add" && (
            <h1 style={{ marginTop: 0, marginBottom: 0 }}>
              ENTER COURSE DETAILS
            </h1>
          )}
          {action != "add" && (
            <h2 style={{ textAlign: "center", margin: 0 }}>{course.cname}</h2>
          )}
          {action != "add" && (
            <p style={{ textAlign: "center", margin: 0, padding: 0 }}>
              Course Code: {course.ccode}
            </p>
          )}

          <div className="input-container">
            <input
              type="text"
              placeholder={action ? "Enter Course Name" : "Update course name"}
              value={updatedName || ""}
              onChange={(e) => setUpdatedName(e.target.value)}
              className="modal-input"
            />
            <input
              type="text"
              placeholder={action ? "Enter Course Code" : "Update course name"}
              value={updatedCode || ""}
              onChange={(e) => setUpdatedCode(e.target.value)}
              className="modal-input"
            />
            <input
              type="text"
              placeholder={action ? "Enter Course Type" : "Update course name"}
              value={updatedType || ""}
              onChange={(e) => setUpdatedType(e.target.value)}
              className="modal-input"
            />
            <input
              type="number"
              placeholder="Assign semester"
              value={updatedSemester || ""}
              onChange={(e) => setUpdatedSemester(e.target.value)}
              className="modal-input"
              min="1"
              max="8"
            />
            <select
              value={updatedInstructor || ""}
              onChange={(e) => setUpdatedInstructor(e.target.value)}
              className="modal-input"
            >
              <option value="">Assign an instructor</option>
              {instructors.map((instructor) => (
                <option key={instructor.insId} value={instructor.insId}>
                  {instructor.insName} ({instructor.insDesgn})
                </option>
              ))}
            </select>
            <div className="structure-group">
              <input
                type="number"
                placeholder="Lecture"
                value={updatedStructure.cl || ""}
                onChange={(e) =>
                  setUpdatedStructure((prev) => ({
                    ...prev,
                    cl: e.target.value,
                  }))
                }
                className="structure-input"
              />
              <input
                type="number"
                placeholder="Tutorial"
                value={updatedStructure.ct || ""}
                onChange={(e) =>
                  setUpdatedStructure((prev) => ({
                    ...prev,
                    ct: e.target.value,
                  }))
                }
                className="structure-input"
              />
              <input
                type="number"
                placeholder="Practical"
                value={updatedStructure.cp || ""}
                onChange={(e) =>
                  setUpdatedStructure((prev) => ({
                    ...prev,
                    cp: e.target.value,
                  }))
                }
                className="structure-input"
              />
            </div>
          </div>

          <div className="buttons">
            <button
              onClick={() => {
                if (action != "add") {
                  submitButtonHandler(course.ccode);
                  onClose();
                } else {
                  submitButtonHandler();
                  onClose();
                }
              }}
            >
              Submit
            </button>

            <button onClick={onClose}>Close</button>
          </div>
        </div>
      </Modal>
    </>
  );
};
