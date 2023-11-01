import { createSlice } from '@reduxjs/toolkit';

const examSlice = createSlice ({
   name: 'exam',
   initialState:{
    examCatagory:[],
    addQuestions:[],
   },

   reducers:{
    addCatagory:(state,action)=>{
         state.examCatagory = [...state.examCatagory,action.payload]
         console.log('examCtgry examslice add==>',action.payload);
         //    const data = state.examCatagory = [...state.examCatagory,action.payload]
         // console.log('examCtgry examslice add==>',data);
    },
    addQuestions:(state,action)=>{
        state.addQuestions = [...state.addQuestions,action.payload]
        console.log('addQues examslice add==>',action.payload);

    },
   }
   

});
export const {addCatagory,addQuestions} = examSlice.actions
export default examSlice.reducer;