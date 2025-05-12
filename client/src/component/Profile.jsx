import humanImg from "../assests/human.png";

export const Profile = ({ role, user }) => {
  let Id, name, dept, school, desgn, email, sem, contact, cgpa;
  if (role == "student") {
    ({
      rollno: Id,
      sname: name,
      sdept: dept,
      sschool: school,
      ssem: sem,
      contact: contact,
      semail: email,
      scgpa: cgpa,
    } = user);
  } else if (role == "faculty") {
    ({
      insId: Id,
      insName: name,
      insDept: dept,
      insDesgn: desgn,
      insSchool: school,
      insEmail: email,
    } = user);
  } else if (role == "admin") {
    ({
      adminId: Id,
      adminName: name,
      adminDept: dept,
      adminDesgn: desgn,
      adminEmail: email,
    } = user);
  }
  console.log(role);
  console.log(user);
  console.log(Id);
  console.log(name);
  const editProfileHandler = () => {
    console.log("EDIT PROFILE");
  };
  return (
    <div className="student-profile-container">
      <div className="studentprofile">
        <div className="pl">
          <img src={humanImg} alt="" />
          <h2>{name}</h2>
          {Id && (
            <span>
              {role === "student"? "Enrollment No: " : "Id"} <strong>{Id}</strong>
            </span>
          )}
          <button className="edit-profile" onClick={editProfileHandler} style={{marginTop: "20px"}}>
            Edit Profile
          </button>
        </div>

        <div className="pr">
          {desgn && (
            <div className="p-items">
              <div className="p-label">Designation</div>
              <div className="p-value">{desgn}</div>
            </div>
          )}
          {dept && (
            <div className="p-items">
              <div className="p-label">Department</div>
              <div className="p-value">{dept}</div>
            </div>
          )}
          {sem && (
            <div className="p-item">
              <div className="p-label">Semester</div>
              <div className="p-value">{sem}</div>
            </div>
          )}
          {cgpa && (
            <div className="p-item">
              <div className="p-label">CGPA</div>
              <div className="p-value">{cgpa}</div>
            </div>
          )}
          {contact && (
            <div className="p-item">
              <div className="p-label">School</div>
              <div className="p-value">{school}</div>
            </div>
          )}
          {contact && (
            <div className="p-item">
              <div className="p-label">Contact</div>
              <div className="p-value">{contact}</div>
            </div>
          )}
          {email && (
            <div className="p-item">
              <div className="p-label">Email</div>
              <div className="p-value">{email}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
