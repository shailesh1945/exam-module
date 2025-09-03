import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api/api';

const ResultPage = () => {
  const { id } = useParams();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const res = await api.get(`/exam/result/${id}`);
        setResult(res.data);
      } catch (err) {
        console.error(err);
        alert('Failed to fetch result');
      } finally {
        setLoading(false);
      }
    };
    fetchResult();
  }, [id]);

  if (loading) return <div className="text-center mt-5">Loading result...</div>;
  if (!result) return <div className="text-center mt-5">No result found.</div>;

  return (
    <div className="container my-5">
      <div className="card shadow-sm rounded-4 p-4 mb-4 text-center">
        <h3 className="fw-bold mb-3">Exam Result</h3>
        <div className="d-flex justify-content-around flex-wrap">
          <div className="mb-2">
            <strong>Total Questions:</strong> {result.totalQuestions}
          </div>
          <div className="mb-2">
            <strong>Correct Answers:</strong> {result.correctAnswers}
          </div>
          <div className="mb-2">
            <strong>Score:</strong> {result.score}
          </div>
        </div>
      </div>

      <h5 className="mb-3 fw-semibold">Question Details</h5>
      <div className="d-flex flex-column gap-3">
        {result.answers.map((a, idx) => (
          <div key={idx} className="card shadow-sm rounded-4 p-3">
            <p className="mb-1"><strong>Q{idx + 1}:</strong> {a.question?.text || 'Question removed'}</p>
            <p className="mb-1">
              <strong>Your answer:</strong>{' '}
              <span className={a.isCorrect ? 'text-success fw-bold' : 'text-danger fw-bold'}>
                {a.selectedOptionKey || 'No answer'}
              </span>
            </p>
            <p className="mb-1"><strong>Correct answer:</strong> {a.correctOptionKey}</p>
            <span
              className={`badge ${a.isCorrect ? 'bg-success' : 'bg-danger'}`}
            >
              {a.isCorrect ? 'Correct' : 'Incorrect'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultPage;
