import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "./ApiSlice";
import eventSlice from "./EventSlice";
import newsData from "./ArticleSlice";
import examSlice from "./ExamSlice";
// import userSlice  from "./userlist_slices/UserListSlice";

export const store = configureStore({
  reducer: {
    api: apiSlice,
    events: eventSlice,
    newsData:newsData,
    exam:examSlice,
    // userlist:userSlice
  },
});
