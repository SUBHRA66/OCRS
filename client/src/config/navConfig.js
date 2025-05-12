import { FaHome, FaUser, FaChartBar, FaCog } from "react-icons/fa";
export const faculyNavLinks = [
  { name: "OVERVIEW", path: "/faculty/dashboard/overview" },
  { name: "PROFILE", path: "/faculty/dashboard/profile" },
  { name: "MY COURSES", path: "/faculty/dashboard/my-courses" }
];

export const adminNavLInks = [
  { name: "OVERVIEW", path: "/admin/dashboard/overview"},
  { name: "PROFILE", path: "/admin/dashboard/profile"},
  { name: "MANAGE COURSE", path: "/admin/dashboard/manage-course"},
  { name: "MANAGE STUDENT", path: "/admin/dashboard/manage-student"},
  { name: "MANAGE FACULTY", path: "/admin/dashboard/manage-faculty"}
]

export const studentNavLinks = [
  { name: "HOME", path: "/student/dashboard/overview"},
  { name: "PROFILE", path: "/student/dashboard/profile"},
  { name: "CURRENT SEMESTER", path: "/student/dashboard/curr-sem"},
  { name: "COURSE REGISTRATION", path: "/student/dashboard/course-reg"},
  { name: "PAST SEMESTERS", path: "/student/dashboard/past-semester"}
]
