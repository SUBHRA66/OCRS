import React from "react";
import reactDOM from "react-dom/client";
import { Login } from "./component/Login";
import { StudentDashboard } from "./component/StudentComponents/StudentDashboard";
import { Header } from "./component/Header";
import { Provider } from "react-redux";
import { persistor, store } from "./utils/store";
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
import { ForgetPassword } from "./component/ForgetPassword";
import { StudentOverview } from "./component/StudentComponents/StudentOverview";
import { StudentPastSemester } from "./component/StudentComponents/StudentPastSemester";
import { AdminOverview } from "./component/AdminComponents/AdminOverview";
import { AdvisorCompletedCourses } from "./component/AdvisorComponents/AdvisorCompletedCourses";
import { AdvisorMyCourses } from "./component/AdvisorComponents/AdvisorMyCourses";
import { PersistGate } from "redux-persist/integration/react";

const Layout = () => {
  const student = useSelector((state) => state.student);
  const faculty = useSelector((state) => state.faculty);
  const advisor = useSelector((state) => state.advisor);
  const admin = useSelector((state) => state.admin);
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forget-password" element={<ForgetPassword />} />

        {/* STUDENT ROUTES */}
        {student && (
          <Route>
            <Route path="/student/dashboard" element={<StudentDashboard />}>
              <Route index element={<Navigate to="overview" replace />} />
              <Route path="overview" element={<StudentOverview />} />
              <Route path="profile" element={<StudentProfile />} />
              <Route path="curr-sem" element={<StudentCurrentSemester />} />
              <Route path="past-semester" element={<StudentPastSemester />} />
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
            <Route path="overview" element={<AdminOverview />} />
            <Route path="profile" element={<AdminProfile />} />
            <Route path="manage-course" element={<AdminManageCourse />} />
            <Route path="manage-student" element={<AdminManageStudent />} />
            <Route path="manage-faculty" element={<AdminManageFaculty />} />
            <Route path="modify-faculty" element={<AdminManageFaculty />} />
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
            <Route path="/advisor/my-courses" element={<AdvisorMyCourses />} />

            <Route
              path="/advisor/course-reg/students/dash"
              element={<AdvisorCourseReg />}
            >
              <Route index element={<Navigate to="manage-req" replace />} />
              <Route path="manage-req" element={<AdvisorManageRequests />} />
              <Route path="curr-sem" element={<AdvisorCurrSem />} />
              <Route
                path="completed-courses"
                element={<AdvisorCompletedCourses />}
              />
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
    <PersistGate loading={null} persistor={persistor}>
      <Layout />
    </PersistGate>
  </Provider>
);
