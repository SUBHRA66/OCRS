import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../utils/constants";

export const AdvisorManageRequests = () => {
  const student = useSelector((state) => state.student);
  const [requests, setRequests] = useState([]);
  const [creditCount, setCreditCount] = useState(0);
  const [approved, setApproved] = useState(false);
  const [rejected, setRejected] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [approvalMessage, setApprovalMessage] = useState("");
  const [modalAction, setModalAction] = useState(""); // "approve" or "reject"

  useEffect(() => {
    async function getAllRequests(rollno) {
      const response = await axios.get(
        BASE_URL + "advisor/course-reg/get-all-requests/" + rollno,
        { withCredentials: true }
      );
      const data = response.data;
      setRequests(data.request);
      setCreditCount(data.creditsSelected);

      if (data.request.length > 0 && data.request[0].status === "rejected") {
        setRejected(true);
      } else if (
        data.request.length > 0 &&
        data.request[0].status === "approved"
      ) {
        setApproved(true);
      }
    }
    getAllRequests(student.rollno);
  }, []);

  const openModal = (action) => {
    setModalAction(action); // "approve" or "reject"
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setApprovalMessage("");
    setModalAction("");
  };

  const handleModalConfirm = async () => {
    setShowModal(false);

    try {
      if (modalAction === "approve") {
        setApproved(true);
        await axios.post(
          BASE_URL + "advisor/course-reg/approve-request/" + student.rollno,
          {},
          { withCredentials: true }
        );
      } else if (modalAction === "reject") {
        setRejected(true);
        setApproved(false);
        await axios.post(
          BASE_URL + "advisor/course-reg/reject-request/" + student.rollno,
          {},
          { withCredentials: true }
        );
      }

      // TODO: Add send email logic here
      console.log("Message to send via email:", approvalMessage);
      console.log("Student email:", student.semail);
    } catch (error) {
      console.error("Error during request:", error);
    }
  };

  // JSX rendering logic
  if (!approved && creditCount > 0 && !rejected) {
    return (
      <div className="student-course-reg">
        <div className="student-course-reg__headline">
          <h1>Total Credit Selected: {creditCount}</h1>
        </div>
        <div className="student-course-reg__requested-courses">
          {requests.map((course) => (
            <div key={course.ccode} className="course-row">
              <div className="course-row__code">{course.ccode}</div>
              <div className="course-row__name">{course.cname}</div>
              <div className="course-row__name">{course.ctype}</div>
              <div className="course-row__credits">
                Credit: {course.ccredit}
              </div>
            </div>
          ))}
        </div>
        <div className="approve-reject-container">
          <button className="approve-request-btn" onClick={() => openModal("approve")}>
            Approve Request
          </button>
          <button className="reject-request-btn" onClick={() => openModal("reject")}>
            Reject Request
          </button>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal-box">
              <h2>{modalAction === "approve" ? "Send Approval Message" : "Send Rejection Message"}</h2>
              <textarea
                placeholder="Type your message to the student..."
                value={approvalMessage}
                onChange={(e) => setApprovalMessage(e.target.value)}
                rows={5}
                style={{ width: "100%", marginTop: "10px", padding: "8px" }}
              />
              <div
                style={{
                  marginTop: "20px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <button
                  className={modalAction === "approve" ? "approve-request-btn" : "reject-request-btn"}
                  onClick={handleModalConfirm}
                >
                  {modalAction === "approve" ? "Approve & Send Mail" : "Reject & Send Mail"}
                </button>
                <button className="reject-request-btn" onClick={closeModal}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  } else if (creditCount === 0 && !approved && !rejected) {
    return (
      <div className="student-course-reg">
        <div className="student-course-reg__headline">
          <h1>NO COURSE SELECTED BY THE STUDENT YET</h1>
        </div>
        <div className="approve-reject-container">
          <button className="invalid-btn">Approve Request</button>
          <button className="invalid-btn">Reject Request</button>
        </div>
      </div>
    );
  } else if (approved) {
    return (
      <div className="student-course-reg">
        <div className="student-course-reg__headline">
          <h1>COURSE REGISTRATION ALREADY APPROVED</h1>
        </div>
      </div>
    );
  } else if (rejected) {
    return (
      <div className="student-course-reg">
        <div className="student-course-reg__headline">
          <h1>Previous Course Registration Request Rejected</h1>
        </div>
      </div>
    );
  }
};
