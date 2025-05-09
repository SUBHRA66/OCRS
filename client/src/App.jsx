import React from "react";
import reactDOM from "react-dom/client";
import { Login } from "./component/Login";
import { StudentDashboard } from "./component/StudentComponents/StudentDashboard";
import { Header } from "./component/Header";
import { Provider } from "react-redux";
import { store } from "./utils/store";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { StudentProfile } from "./component/StudentComponents/StudentProfile";
import { useSelector } from "react-redux";
import { StudentCurrentSemester } from "./component/StudentComponents/StudentCurrentSemester";
import { FacultyDashboard } from "./component/FacultyComponents/FacultyDashboard";
import { FacultyProfile } from "./component/FacultyComponents/FacultyProfile";
import { AdvisorDashboard } from "./component/AdvisorComponents/AdvisorDashboard";
import { AdvisorProfile } from "./component/AdvisorComponents/AdvisorProfile";
import { AdvisorCourseReg } from "./component/AdvisorComponents/AdvisorCourseReg";
import { StudentBacklogCourses } from "./component/StudentComponents/StudentBacklogCourses";
import { AdminDashboard } from "./component/AdminComponents/AdminDashboard";
import { AdvisorSeeStudents } from "./component/AdvisorComponents/AdvisorSeeStudents";
import { FacultyCourses } from "./component/FacultyComponents/FacultyCourses";
import { FacultyOverview } from "./component/FacultyComponents/FacultyOverview";
import { AdminProfile } from "./component/AdminComponents/AdminProfile";
import { AdminManageCourse } from "./component/AdminComponents/AdminManageCourse";
import { AdminManageStudent } from "./component/AdminComponents/AdminManageStudent";
import { AdminManageFaculty } from "./component/AdminComponents/AdminManageFaculty";
import { AdvisorManageRequests } from "./component/AdvisorComponents/AdvisorManageRequests";
import { AdvisorCurrSem } from "./component/AdvisorComponents/AdvisorCurrSem";
import { StudentCourseRegistration } from "./component/StudentComponents/StudentCourseRegistration";

const Layout = () => {
  const student = useSelector((state) => state.student);
  const faculty = useSelector((state) => state.faculty);
  const advisor = useSelector((state) => state.advisor);
  const admin = useSelector((state) => state.admin);
  console.log(student);
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Login />} />

        {/* STUDENT ROUTES */}

        {student && (
          <Route>
            <Route path="/student/dashboard" element={<StudentDashboard />}>
              <Route index element={<Navigate to="overview" replace />} />
              <Route path="overview" element={<FacultyOverview />} />
              <Route path="profile" element={<StudentProfile />} />
              <Route path="curr-sem" element={<StudentCurrentSemester />} />
              <Route
                path="course-reg"
                element={<StudentCourseRegistration />}
              />
            </Route>
            <Route
              path="/student/course-registration/backlog-courses"
              element={<StudentBacklogCourses />}
            />
          </Route>
        )}

        {/* FACUTLY ROUTES */}
        {faculty && (
          <Route>
            <Route path="/faculty/dashboard" element={<FacultyDashboard />}>
              <Route index element={<Navigate to="overview" replace />} />
              <Route path="overview" element={<FacultyOverview />} />
              <Route path="profile" element={<FacultyProfile />} />
              <Route path="my-courses" element={<FacultyCourses />} />
            </Route>
          </Route>
        )}
        {/* ADMIN ROUTES */}

        {admin && (
          <Route path="/admin/dashboard" element={<AdminDashboard />}>
            <Route index element={<Navigate to="overview" replace />} />
            <Route path="overview" element={<FacultyOverview />} />
            <Route path="profile" element={<AdminProfile />} />
            <Route path="manage-course" element={<AdminManageCourse />} />
            <Route path="manage-student" element={<AdminManageStudent />} />
            <Route path="manage-faculty" element={<AdminManageFaculty />} />
          </Route>
        )}
        {advisor && (
          <Route>
            <Route path="/advisor/dashboard" element={<AdvisorDashboard />} />
            <Route path="/advisor/profile" element={<AdvisorProfile />} />
            <Route
              path="/advisor/course-reg/students"
              element={<AdvisorSeeStudents />}
            />

            <Route
              path="/advisor/course-reg/students/dash"
              element={<AdvisorCourseReg />}
            >
              <Route index element={<Navigate to="manage-req" replace />} />
              <Route path="manage-req" element={<AdvisorManageRequests />} />
              <Route path="curr-sem" element={<AdvisorCurrSem />} />
              <Route path="completed-courses" element={<AdvisorCurrSem />} />
            </Route>
          </Route>
        )}
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
