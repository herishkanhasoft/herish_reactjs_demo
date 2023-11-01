import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './customizationReducer';
import apiSlice from "../views/Task/redux/ApiSlice";
import eventSlice from "../views/Task/redux/EventSlice";
import newsData from "../views/Task/redux/ArticleSlice";
import examSlice from "../views/Task/redux/ExamSlice";


// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
  customization: customizationReducer,
  api: apiSlice,
  events: eventSlice,
  newsData:newsData,
  exam:examSlice,
});

export default reducer;



