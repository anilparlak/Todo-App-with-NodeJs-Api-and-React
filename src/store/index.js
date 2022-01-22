import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import todo from './todo';



const store = configureStore({
  reducer: combineReducers({
    todo
  }),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
});


export default store;