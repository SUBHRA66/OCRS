import {createSlice} from "@reduxjs/toolkit"

const adminSlice = createSlice({
  name: 'admin',
  initialState : {
    items: null
  },
  reducers: {
    addAdmin: (state, action)=>{
      return action.payload;
    },
    removeAdmin: ()=>null,
    
  }
})

export const {addAdmin, removeAdmin} = adminSlice.actions;

export default adminSlice.reducer;