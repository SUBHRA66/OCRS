import { useSelector } from "react-redux";
import { Profile } from "../Profile";

export const StudentProfile = () => {
  const student = useSelector((state) => state.student);
  console.log(student);
  const editProfileHandler = () => {
    console.log("EDIT PROFILE");
  };
  return <Profile role={"student"} user={student} />;
};
