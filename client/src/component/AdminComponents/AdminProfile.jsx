import React from "react";
import { useSelector } from "react-redux";
import adminImage from "../../assests/Sakil.png";
import { Profile } from "../Profile";

export const AdminProfile = () => {
  const admin = useSelector((state) => state.admin);
  console.log(admin);
  return <Profile role={"admin"} user={admin} />;
};
