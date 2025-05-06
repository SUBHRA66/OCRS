import { createSlice } from "@reduxjs/toolkit";

const facultySlice = createSlice({
  name: "faculty",
  initialState: {
    items: null
  },
  reducers: {
    addFaculty: (state, action)=>{
      return action.payload;
    },
    removeFaculty: (state)=>null
  }
})

export const {addFaculty, removeFaculty} = facultySlice.actions;
export default facultySlice.reducer;