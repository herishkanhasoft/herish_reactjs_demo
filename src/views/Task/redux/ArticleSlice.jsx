import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// import { useState } from "react";
export const fetchNews = createAsyncThunk("fetch", async (data) => {
  try {
    if (data) {
      const fetchDataFromapi = await axios.get(
        `https://newsdata.io/api/1/news?apikey=pub_3104733da70fdbf0cb1e8f54b10866f91e05d&q=india&page=${data}`
      );
      return fetchDataFromapi.data;
    } else {
      const fetchDataFromapinormal = await axios.get(
        `https://newsdata.io/api/1/news?apikey=pub_31126cba7b4f032a3a2a85d4a9d9b00ddad88&q=india`
      );
      console.log(fetchDataFromapinormal.data);
      return fetchDataFromapinormal.data;
    }
  } catch (error) {
    console.log(error);
  }
});

export const searchdata = createAsyncThunk("fetch/serchdata", async (data) => {
  try {
    const fetchDataFromapi = await axios.get(
      `https://newsdata.io/api/1/news?apikey=pub_31126cba7b4f032a3a2a85d4a9d9b00ddad88&q=${data}`
    );
    return fetchDataFromapi.data;
  } catch (error) {
    console.log(error);
  }
});

const newsData = createSlice({
  name: "newsData",

  initialState: {
    allData: [],
    currentPage: [{ index: 1, id: "" }],
  },

  reducers: {
    setPreviousPageNum: (state, action) => {
      const isPresent = state.currentPage.find(
        (item) => item.currentId === action.payload.id
      );
      if (!isPresent) {
        const cloneCurrentPage = [...state.currentPage];
        let findLastelement =
          cloneCurrentPage[cloneCurrentPage.length - 1].index;
        state.currentPage = [
          ...state.currentPage,
          { index: findLastelement + 1, currentId: action.payload.id },
        ];
      }
    },
  },

  extraReducers: function (builder) {
    builder.addCase(fetchNews.fulfilled, (state, action) => {
      state.allData = action.payload;
    });
    builder.addCase(searchdata.fulfilled, (state, action) => {
      state.allData = action.payload;
    });
  },
});

export default newsData.reducer;
export const { setPreviousPageNum } = newsData.actions;
