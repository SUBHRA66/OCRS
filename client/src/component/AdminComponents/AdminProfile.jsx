import { useSelector } from "react-redux";
import { Profile } from "../Profile";

export const AdminProfile = () => {
  const admin = useSelector((state) => state.admin);
  console.log(admin);
  return <Profile role={"admin"} user={admin} />;
};
