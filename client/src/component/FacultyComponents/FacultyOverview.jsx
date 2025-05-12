import { useSelector } from "react-redux"

export const FacultyOverview = () =>{
  const faculty = useSelector((state)=>state.faculty)

  return (
    <div className="student-overview-container">
      <h2>Student Overview</h2>
      <div className="tiles-container">
        <div className="tile profile-tile">
          <h3>Profile</h3>
          <p><strong>Name:</strong> {faculty.insName}</p>
          <p><strong>Instructor Id:</strong> {faculty.insId}</p>
          <p><strong>Department:</strong> {faculty.insDept}</p>
        </div>

        <div className="tile completed-credits-tile">
          <h3>Total years of experience</h3>
          <p className="tile-number">16</p>
        </div>

        <div className="tile current-credits-tile">
          <h3>Salary</h3>
          <p className="tile-number">88,342</p>
        </div>
      </div>
    </div>
  )
}