import React, { useState } from 'react';

function CreateAssessment() {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([{ question: '', options: ['', '', '', ''], correctOption: '' }]);

  const handleAddQuestion = () => {
    setQuestions([...questions, { question: '', options: ['', '', '', ''], correctOption: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/assessment/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ title, questions }),
    });

    if (response.ok) {
      alert('Assessment created successfully!');
      setTitle('');
      setQuestions([{ question: '', options: ['', '', '', ''], correctOption: '' }]);
    } else {
      alert('Error creating assessment');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 mt-1 border rounded-lg"
          required
        />
      </div>

      {questions.map((q, idx) => (
        <div key={idx} className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Question {idx + 1}</label>
          <input
            type="text"
            value={q.question}
            onChange={(e) => {
              const newQuestions = [...questions];
              newQuestions[idx].question = e.target.value;
              setQuestions(newQuestions);
            }}
            className="w-full p-2 mt-1 border rounded-lg"
            required
          />

          {q.options.map((option, optIdx) => (
            <div key={optIdx} className="flex items-center">
              <input
                type="text"
                value={option}
                onChange={(e) => {
                  const newQuestions = [...questions];
                  newQuestions[idx].options[optIdx] = e.target.value;
                  setQuestions(newQuestions);
                }}
                className="w-full p-2 mt-1 border rounded-lg"
                placeholder={`Option ${optIdx + 1}`}
                required
              />
              <input
                type="radio"
                name={`correctOption${idx}`}
                value={option}
                onChange={(e) => {
                  const newQuestions = [...questions];
                  newQuestions[idx].correctOption = e.target.value;
                  setQuestions(newQuestions);
                }}
                className="ml-2"
                required
              />
            </div>
          ))}
        </div>
      ))}

      <button
        type="button"
        onClick={handleAddQuestion}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Add Question
      </button>

      <button
        type="submit"
        className="w-full py-2 bg-green-600 text-white rounded-lg mt-4"
      >
        Create Assessment
      </button>
    </form>
  );
}

export default CreateAssessment;
