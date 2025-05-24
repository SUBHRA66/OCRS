import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../utils/constants";

export const AdvisorManageRequests = () => {
  const student = useSelector((state) => state.student);
  const [requests, setRequests] = useState([]);
  const [creditCount, setCreditCount] = useState(0);
  const [approved, setApproved] = useState(false);
  const [rejected, setRejected]= useState(false);
  console.log(requests)


  useEffect(() => {
    async function getAllRequests(rollno) {
      const response = await axios.get(
        BASE_URL + "advisor/course-reg/get-all-requests/" + rollno,
        { withCredentials: true }
      );
      const data = response.data;
      setRequests(data.request);
      setCreditCount(data.creditsSelected); 

      if(data.request.length > 0 && data.request[0].status == "rejected") {
        setRejected(true);
      } else if (data.request.length > 0 && data.request[0].status == "approved"){
        setApproved(true);
      }
    }
    getAllRequests(student.rollno);
  }, []);

  const HandleApproveRequest = async (rollno) => {
    setApproved(true);
    const response = await axios.post(
      BASE_URL + "advisor/course-reg/approve-request/" + rollno,
      {},
      { withCredentials: true }
    );
  };

  const HandleRejectRequest = async (rollno) => {
    setRejected(true);
    setApproved(false);
    const response = await axios.post(
      BASE_URL + "advisor/course-reg/reject-request/" + rollno,
      {},
      { withCredentials: true }
    );
  };
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
          <button
            className="approve-request-btn"
            onClick={() => HandleApproveRequest(student.rollno)}
          >
            Approve Request
          </button>
          <button
            className="reject-request-btn"
            onClick={() => HandleRejectRequest(student.rollno)}
          >
            Reject Request
          </button>
        </div>
      </div>
    );
  } else if (creditCount == 0 && !approved && !rejected) {
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
  } else if(rejected){
    return(
      <div className="student-course-reg">
        <div className="student-course-reg__headline">
          <h1>Previous Course Registration Request Rejected</h1>
        </div>
      </div>
    )
  }
};