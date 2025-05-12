import React from "react";
import { useSelector } from "react-redux";
import sakilImg from "../../assests/Sakil.png";
import { Profile } from "../Profile";

export const StudentProfile = () => {
  const student = useSelector((state) => state.student);
  console.log(student);
  const editProfileHandler = () => {
    console.log("EDIT PROFILE");
  };
  return <Profile role={"student"} user={student} />;
};
