import { createSlice } from "@reduxjs/toolkit";
// not in use this slice

export const userSlice = createSlice({
    name:'userlistData',
    initialState:{
        formData: {
            first_name: '',
            last_name: '',
            email: '',
            image: null,
          },
    },
    reducers:{
        setFormData: (state, action) => {
            state.formData = action.payload;
          },
         
    }
})
export const { setFormData, resetFormData } = userSlice.actions;
export default userSlice.reducer;