import { createSlice } from "@reduxjs/toolkit";

export const apiSlice = createSlice({
    name:'apiData',
    initialState:{
        data:null,
        loading: false,
    },
    reducers:{
        fetchDataStart:(state)=>{
            state.loading = true;
        },
        fetchDataSuccess:(state,action)=>{
            state.loading = false;
            state.data = action.payload;
        }
    }
})
export const {
    fetchDataStart,
    fetchDataSuccess,
  } = apiSlice.actions;

export default apiSlice.reducer;