import { useEffect, useState } from "react";
import { CourseList } from "../CourseList";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";

export const AdvisorMyCourses = () => {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    async function getCourse() {
      const response = await axios.get(BASE_URL + "advisor/adv-mycourses", {
        withCredentials: true,
      });
      setCourses(response.data.data);
    }
    getCourse();
  }, []);
  return (
    <div className="">
      <CourseList courses={courses} type={"advisor"} />
    </div>
  );
};
