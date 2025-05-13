import { useSelector } from "react-redux";
import { Profile } from "../Profile";

export const FacultyProfile = () => {
  const faculty = useSelector((state) => state.faculty);
  return <Profile role={"faculty"} user={faculty} />;
};
