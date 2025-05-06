import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "../studentSlice";
import courseReducer from "../courseSlice";
import facultyReducer from "../facultySlice";
import advisorReducer from "../advisorSlice";
import adminReducer from "../adminSlice";
export const store = configureStore({
  reducer: {
    student: studentReducer,
    course: courseReducer,
    faculty: facultyReducer,
    advisor: advisorReducer,
    admin: adminReducer,
  },
});
