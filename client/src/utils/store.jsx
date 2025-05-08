import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "../slices/studentSlice";
import courseReducer from "../slices/courseSlice";
import facultyReducer from "../slices/facultySlice";
import advisorReducer from "../slices/advisorSlice";
import adminReducer from "../slices/adminSlice";
export const store = configureStore({
  reducer: {
    student: studentReducer,
    course: courseReducer,
    faculty: facultyReducer,
    advisor: advisorReducer,
    admin: adminReducer,
  },
});
