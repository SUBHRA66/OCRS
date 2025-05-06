import { createSlice } from "@reduxjs/toolkit";

const advisorSlice = createSlice({
  name: "advisor",
  initialState: {
    items: null
  },
  reducers: {
    addAdvisor: (state, action)=>{
      return action.payload;
    },
    removeAdvisor: (state)=>null
  }
})

export const {addAdvisor, removeAdvisor} = advisorSlice.actions;
export default advisorSlice.reducer;