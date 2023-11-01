import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addQuestions } from 'views/Task/redux/ExamSlice';

const TabTwo = () => {
  const examCategories = useSelector((state) => state.exam.examCatagory);
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    category: '',
    question: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    Answer: ''
  });

  console.log(examCategories, 'exxxxammmm');

  const handleSave = (event) => {
    event.preventDefault();
    dispatch(addQuestions(form));
    setForm({
      category: '',
      question: '',
      option1: '',
      option2: '',
      option3: '',
      option4: '',
      Answer: ''
    });
  };

  const handleSelectChange = (event) => {
    const { value, name } = event.target;
    console.log('==>', event.target.value);
    setForm({
      ...form,
      id: Date.now(),
      [name]: value
    });
  };

  return (
    <>
      <form action="">
        <div className="row">
          <div className="col-md-6 w-25">
            <select id="eventSelect" onChange={handleSelectChange} value={form.category} name="category">
              <option value="">-- Select an exam category --</option>
              {examCategories?.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <h2>Question Form</h2>
            <div>
              <input
                type="text"
                id="question"
                name="question"
                value={form.question}
                placeholder="Question"
                className="m-1 p-5"
                onChange={handleSelectChange}
              />
            </div>
            <div>
              <h4>Options:</h4>

              <div className="m-1 p-2">
                <label htmlFor="option1">A)</label>
                <input type="text" name={'option1'} value={form.option1} onChange={handleSelectChange} />
              </div>
              <div className="m-1 p-2">
                <label htmlFor="option2">B)</label>
                <input type="text" name={'option2'} value={form.option2} onChange={handleSelectChange} />
              </div>
              <div className="m-1 p-2">
                <label htmlFor="option3">C)</label>
                <input type="text" name={'option3'} value={form.option3} onChange={handleSelectChange} />
              </div>
              <div className="m-1 p-2">
                <label htmlFor="option4">D)</label>
                <input type="text" name={'option4'} value={form.option4} onChange={handleSelectChange} />
              </div>

              <div>
                <div>Correct Answer</div>
                <input type="text" id="correctAnswer" name="Answer" value={form.Answer} className="m-1 p-2" onChange={handleSelectChange} />
              </div>
            </div>

            <button onClick={handleSave} className="btn btn-success px-4 m-1">
              Save
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default TabTwo;
