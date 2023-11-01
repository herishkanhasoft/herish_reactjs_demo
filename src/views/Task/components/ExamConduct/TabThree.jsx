import React, { useState } from 'react';
import { useSelector } from 'react-redux';
// import { addQuestions } from "../redux/ExamSlice"; // Import your actions from the correct path

const TabThree = () => {
  const questions = useSelector((state) => state.exam.addQuestions) || [];
  const examCategories = useSelector((state) => state.exam.examCatagory);

  const [selectedOptions, setSelectedOptions] = useState({});
  const [allQuestions, setAllQuestions] = useState([]);
  const [correctAnss, setCorrectAns] = useState(null);

  const handleCheckboxChange = (event, questionId) => {
    const { value, checked } = event.target;
    setSelectedOptions((previousOption) => ({
      ...previousOption,
      [questionId]: checked ? value : null
    }));
  };

  const selectData = (examCategory) => {
    const filteredData = questions.filter((item) => item.category === examCategory);
    setAllQuestions(filteredData);
  };

  const submitData = () => {
    console.log(allQuestions, 'Allq');
    console.log(selectedOptions, 'selectedOptions');

    let CorrectCount = 0;
    for (let t in selectedOptions) {
      const getQue = allQuestions.find((l) => l.id == t);
      const correctAns = getQue.Answer;

      const mySelectedAns = selectedOptions[t];
      console.log('Question :>', getQue.question);
      console.log('correctAns :>', correctAns);
      console.log('Your selected Answer :>', mySelectedAns);

      if (correctAns == mySelectedAns) {
        console.log('Correct');
        CorrectCount++;
        setCorrectAns(CorrectCount);
      } else {
        console.log('In Correct');
        CorrectCount = 0;
        setCorrectAns(0);
      }
    }
  };

  return (
    <div>
      {examCategories?.map((item, index) => (
        <button key={index} onClick={() => selectData(item)} className="btn btn-info">
          {item}
        </button>
      ))}

      <h2>MCQ Questions:</h2>
      <ul>
        {allQuestions?.map((question, questionIndex) => (
          <li key={questionIndex}>
            <p>Question: {question.question}</p>
            <ul>
              <li>
                <label>
                  {question.option1}
                  <input
                    name="option1"
                    value={question.option1}
                    type="checkbox"
                    checked={selectedOptions[question.id] === question.option1}
                    onChange={(e) => handleCheckboxChange(e, question.id)}
                  />
                </label>
              </li>
              <li>
                <label>
                  {question.option2}
                  <input
                    name="option2"
                    value={question.option2}
                    type="checkbox"
                    checked={selectedOptions[question.id] === question.option2}
                    onChange={(e) => handleCheckboxChange(e, question.id)}
                  />
                </label>
              </li>
              <li>
                <label>
                  {question.option3}
                  <input
                    name="option3"
                    value={question.option3}
                    type="checkbox"
                    checked={selectedOptions[question.id] === question.option3}
                    onChange={(e) => handleCheckboxChange(e, question.id)}
                  />
                </label>
              </li>
              <li>
                <label>
                  {question.option4}
                  <input
                    name="option4"
                    value={question.option4}
                    type="checkbox"
                    checked={selectedOptions[question.id] === question.option4}
                    onChange={(e) => handleCheckboxChange(e, question.id)}
                  />
                </label>
              </li>
            </ul>
          </li>
        ))}
      </ul>
      <div>
        <button onClick={submitData} className="btn btn-success m-1 px-4">
          Submit
        </button>
      </div>
      <div>
        {correctAnss !== null && (
          <h2>
            Total: {correctAnss} out of {allQuestions.length}
          </h2>
        )}
      </div>
    </div>
  );
};

export default TabThree;
