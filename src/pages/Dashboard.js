import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const assessmentdata = [
        {
          title: 'Basic Math Test',
          questions: [
            {
              question: 'What is 2 + 2?',
              options: ['3', '4', '5'],
              correctOption: '4',
            },
            {
              question: 'What is 7 - 3?',
              options: ['4', '5', '6'],
              correctOption: '4',
            },
          ],
        },
        {
          title: 'General Knowledge Quiz',
          questions: [
            {
              question: 'What is the capital of France?',
              options: ['Berlin', 'Madrid', 'Paris'],
              correctOption: 'Paris',
            },
            {
              question: 'Who wrote "To Kill a Mockingbird"?',
              options: ['Harper Lee', 'Mark Twain', 'Ernest Hemingway'],
              correctOption: 'Harper Lee',
            },
          ],
        },
      ];
  const [assessments, setAssessments] = useState(assessmentdata);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  

  useEffect(() => {
    const fetchAssessments = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const { data } = await axios.get('http://localhost:5000/api/assessments', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAssessments(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchAssessments();
  }, [navigate]);

  return (
    <div className="container mx-auto p-4">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Link to="/create-assessment" className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-blue-600">
          Create Assessment
        </Link>
      </header>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Your Assessments</h2>
          {assessments.length === 0 ? (
            <div className="text-center">No assessments available. Create one to get started!</div>
          ) : (
            <ul className="space-y-4">
              {assessments.map((assessment) => (
                <li key={assessment._id} className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-medium">{assessment.title}</h3>
                  <Link
                    to={`/take-assessment/${assessment._id}`}
                    className="text-blue-500 hover:underline mt-2 block"
                  >
                    Take Assessment
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
