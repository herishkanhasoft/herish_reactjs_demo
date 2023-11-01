import { Button, InputAdornment, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCatagory } from 'views/Task/redux/ExamSlice';

const TabOne = () => {
  const dispatch = useDispatch();
  const [examCategory, setExamCategory] = useState(''); // State to manage the input field value

  const handleAddEvent = () => {
    if (examCategory.trim() !== '') {
      dispatch(addCatagory(examCategory));
      setExamCategory(''); // Clear the input field
    } else {
      alert('Category cannot be empty');
    }
  };

  return (
    <>
      <div className="container">
        <div className="row justify-content-center align-item center">
          <div className="col-md-3">
            <TextField
              label="Exam Category"
              id="outlined-start-adornment"
              sx={{ m: 1, width: '25ch' }}
              InputProps={{
                startAdornment: <InputAdornment position="start"></InputAdornment>
              }}
              value={examCategory}
              onChange={(e) => setExamCategory(e.target.value)}
            />
            <div className="ms-4">
              <Button variant="contained" color="primary" onClick={handleAddEvent}>
                Add Exam Category
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TabOne;
