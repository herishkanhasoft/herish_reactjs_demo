import { createSlice } from '@reduxjs/toolkit';
// import React from 'react';

const eventSlice = createSlice({
    name: 'events',
    // initialState: [],
    initialState:{
    eventCatagory:[],
    eventList:[],
    jsonDataStore:null,
    jsonDataList:null,
    },
    reducers: {
      addEvent: (state, action) => {
        state.eventCatagory = [...state.eventCatagory,action.payload];
        console.log('action in slice',action.payload);
      },
      addEventList: (state, action) => {
        state.eventList = [...state.eventList,action.payload];
        console.log("events => ",state.eventList);
        console.log('action in slice list',action.payload);
      },
      deleteEvent: (state, action) => {    
   
        // state.eventCatagory.splice(action.payload,1);
        state.eventCatagory = state.eventCatagory.filter((event) => event.name !== action.payload);

        console.log('eventcatagory',state.eventCatagory);
        state.eventList = state.eventList.filter((event) => event.catagory !== action.payload);
      },
     
      filterDelete: (state, action) => {
        state.eventCatagory = state.eventCatagory.filter((event) => event.name !== action.payload);
        state.eventList = state.eventList.filter((event) => event.catagory !== action.payload);
      },
      storeExpDataCatagory: (state, action) => {
        state.jsonDataStore = action.payload; // Set the JSON data in the state
    },
      storeExpDataList: (state, action) => {
        state.jsonDataList = action.payload; // Set the JSON data in the state
    },
     
    },
  });
export const { addEvent,deleteEvent ,addToTable,addEventList, filterDelete , storeExpDataCatagory, storeExpDataList } = eventSlice.actions;

export default eventSlice.reducer;