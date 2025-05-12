import React from "react";
import { useSelector } from "react-redux";
import facultyImg from "../../assests/Sakil.png";
import { Profile } from "../Profile";

export const FacultyProfile = () => {
  const faculty = useSelector((state) => state.faculty);
  return <Profile role={"faculty"} user={faculty} />;
};
