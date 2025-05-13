import { combineReducers, configureStore } from "@reduxjs/toolkit";
import studentReducer from "../slices/studentSlice";
import courseReducer from "../slices/courseSlice";
import facultyReducer from "../slices/facultySlice";
import advisorReducer from "../slices/advisorSlice";
import adminReducer from "../slices/adminSlice";
import {persistReducer, persistStore} from "redux-persist";
import storage from "redux-persist/lib/storage"
/* export const store = configureStore({
  reducer: {
    student: studentReducer,
    course: courseReducer,
    faculty: facultyReducer,
    advisor: advisorReducer,
    admin: adminReducer,
  },
}); */

const rootReducer = combineReducers({
  student: studentReducer,
  course: courseReducer,
  faculty: facultyReducer,
  advisor: advisorReducer,
  admin: adminReducer,
});
const persistConfig = {
  key: "root",
  storage,
}

const persistedReducer = persistReducer(
  persistConfig, rootReducer
)

export const store = configureStore({
  reducer: persistedReducer
})
export const persistor = persistStore(store);