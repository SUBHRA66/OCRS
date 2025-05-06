import React from "react";
import reactDOM from "react-dom/client";
import { Login } from "./component/Login";
import { StudentDashboard } from "./component/StudentDashboard";
import { Header } from "./component/Header";
import { Provider } from "react-redux";
import { store } from "./utils/store";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import { StudentProfile } from "./component/StudentProfile";
import { useSelector } from "react-redux";
import { CurrentSemester } from "./component/CurrentSemester";
import { CourseRegistration } from "./component/CourseRegistration";
import { FacultyDashboard } from "./component/FacultyComponents/FacultyDashboard";
import { FacultyProfile } from "./component/FacultyComponents/FacultyProfile";
import { AdvisorDashboard } from "./component/AdvisorDashboard";
import { AdvisorProfile } from "./component/AdvisorProfile";
import { AdvisorCourseReg } from "./component/AdvisorCourseReg";
import { BacklogCourses } from "./component/BacklogCourses";
import { AdminDashboard } from "./component/AdminComponents/AdminDashboard";
import { AdvisorSeeStudents } from "./component/AdvisorSeeStudents";
import { Dada } from "./component/dada";
import { FacultyCourses } from "./component/FacultyComponents/FacultyCourses";
import { FacultyOverview } from "./component/FacultyComponents/FacultyOverview";
import { FacultyLogout } from "./component/FacultyComponents/FacultyLogout";
import { AdminProfile } from "./component/AdminComponents/AdminProfile";
import { AdminManageCourse } from "./component/AdminComponents/AdminManageCourse";
import { AdminManageStudent } from "./component/AdminComponents/AdminManageStudent";
import { AdminManageFaculty } from "./component/AdminComponents/AdminManageFaculty";
const Layout = () => {
  const student = useSelector((state) => state.student);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/student/profile" element={<StudentProfile />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/mycourses" element={<CurrentSemester />} />
        <Route
          path="/student/course-registration"
          element={<CourseRegistration />}
        />
        <Route
          path="/student/course-registration/backlog-courses"
          element={<BacklogCourses />}
        />
        <Route path="/faculty/dashboard" element={<FacultyDashboard />}>
          <Route index element={<Navigate to="overview" replace />} />
          <Route path="overview" element={<FacultyOverview />} />
          <Route path="profile" element={<FacultyProfile />} />
          <Route path="my-courses" element={<FacultyCourses />} />
          <Route path="logout" element={<FacultyLogout />} />
        </Route>

        <Route path="/admin/dashboard" element={<AdminDashboard />}>
          <Route index element={<Navigate to="overview" replace />} />
          <Route path="overview" element={<FacultyOverview />} />
          <Route path="profile" element={<AdminProfile />} />
          <Route path="manage-course" element={<AdminManageCourse />} />
          <Route path="manage-student" element={<AdminManageStudent />} />
          <Route path="manage-faculty" element={<AdminManageFaculty />} />
        </Route>

        <Route path="/advisor/dashboard" element={<AdvisorDashboard />} />
        <Route path="/advisor/profile" element={<AdvisorProfile />} />
        <Route
          path="/advisor/course-reg/students"
          element={<AdvisorSeeStudents />}
        />
        <Route
          path="/advisor/course-reg/students/manage-req"
          element={<AdvisorCourseReg />}
        />
        <Route
          path="/advisor/course-reg/students/current-sem"
          element={<Dada />}
        />

        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

const root = reactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Layout />
  </Provider>
);
