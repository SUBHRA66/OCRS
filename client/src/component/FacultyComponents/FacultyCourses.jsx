import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/constants";
import { CourseList } from "../CourseList";
import { useSelector } from "react-redux";

export const FacultyCourses = () => {
  const faculty = useSelector((state) => state.faculty);
  const [mycourses, setMycourses] = useState([]);

  useEffect(() => {
    async function fetchCourse() {
      const response = await axios.get(BASE_URL + "faculty/my-courses", {
        withCredentials: true,
      });
      setMycourses(response.data);
    }
    fetchCourse();
  }, []);
  console.log(mycourses);
  return <CourseList courses={mycourses} user={faculty} type={"faculty"} />;
};
