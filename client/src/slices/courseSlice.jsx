import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: null,
    courses: [],
    backlogCourses: [],
    selectedCourses: [],
    creditCount: null
}
const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    addCourses: (state, action) => {
      state.courses = action.payload;
    },
    removeCourses: (state) => {
      state.courses = null;
    },
    addSelectedCourses: (state, action) => {
      state.selectedCourses.push(action.payload);
    },
    removeSelectedCourse: (state, action) => {
      const courseCodeToRemove = action.payload;
      state.selectedCourses = state.selectedCourses.filter(
        (course) => course.ccode !== courseCodeToRemove
      );
    },
    addBacklogCourses: (state, action) => {
      state.backlogCourses.push(action.payload);
    },
    removeBacklogCourses: (state, action) => {
      const courseCodeToRemove = action.payload;
      state.backlogCourses = state.backlogCourses.filter(
        (course) => course.ccode !== courseCodeToRemove
      );
    },
    addCreditCount: (state, action)=>{
      const credit = action.payload;
      state.creditCount = state.creditCount + credit;
    },
    removeCreditCount: (state, action) =>{
      const credit = action.payload;
      state.creditCount = state.creditCount - credit;
    },
    clearAllCourseState: () =>initialState
  },
});

export const {
  addCourses,
  removeCourses,
  addSelectedCourses,
  removeSelectedCourse,
  addBacklogCourses,
  removeBacklogCourses,
  addCreditCount,
  removeCreditCount,
  clearAllCourseState
} = courseSlice.actions;

export default courseSlice.reducer;
