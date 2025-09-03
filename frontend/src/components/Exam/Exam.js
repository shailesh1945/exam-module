import React, { useEffect, useState, useCallback } from 'react';
import api from '../../api/api';
import QuestionCard from './QuestionCard';
import Timer from './Timer';
import { useNavigate } from 'react-router-dom';

const Exam = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const DURATION_SECONDS = 30 * 60;

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const res = await api.get('/exam/questions?count=10');
      setQuestions(res.data);
      setCurrentIdx(0);
      setAnswers({});
    } catch (err) {
      console.error(err);
      alert('Failed to load questions. Please login and try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const onSelect = (questionId, selectedKey) => {
    setAnswers(prev => ({ ...prev, [questionId]: selectedKey }));
  };

  const goNext = () => setCurrentIdx(i => Math.min(i + 1, questions.length - 1));
  const goPrev = () => setCurrentIdx(i => Math.max(i - 1, 0));

  const handleSubmit = useCallback(async () => {
    if (submitting) return;
    setSubmitting(true);
    try {
      const payloadAnswers = questions.map(q => ({
        questionId: q._id,
        selectedOptionKey: answers[q._id] || null
      }));
      const res = await api.post('/exam/submit', { answers: payloadAnswers });
      const resultId = res.data.resultId;
      navigate(`/result/${resultId}`);
    } catch (err) {
      console.error(err);
      alert('Submission failed');
    } finally {
      setSubmitting(false);
    }
  }, [answers, questions, navigate, submitting]);

  const onExpire = () => {
    handleSubmit();
  };

  if (loading) return <div className="text-center mt-5">Loading questions...</div>;
  if (!questions.length) return <div className="text-center mt-5">No questions available. Please contact admin.</div>;

  const curQ = questions[currentIdx];
  const selected = answers[curQ._id];

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-4 p-3 bg-light rounded shadow-sm sticky-top" style={{ top: 0, zIndex: 1000 }}>
        <h4 className="m-0">Exam</h4>
        <Timer initialSeconds={DURATION_SECONDS} onExpire={onExpire} />
      </div>

      <div className="card shadow-sm mb-4 p-4 rounded-4">
        <QuestionCard question={curQ} selectedOption={selected} onSelect={onSelect} />
      </div>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <button className="btn btn-outline-secondary me-2 rounded-pill" onClick={goPrev} disabled={currentIdx === 0}>Previous</button>
          <button className="btn btn-outline-secondary rounded-pill" onClick={goNext} disabled={currentIdx === questions.length - 1}>Next</button>
        </div>

        <div>
          <button
            className="btn btn-outline-info me-2 rounded-pill"
            onClick={() => {
              const idx = prompt(`Enter question number (1-${questions.length})`);
              const i = parseInt(idx) - 1;
              if (!isNaN(i) && i >= 0 && i < questions.length) setCurrentIdx(i);
            }}
          >
            Jump
          </button>

          <button
            className="btn btn-success rounded-pill"
            onClick={() => {
              if (window.confirm('Are you sure you want to submit the exam?')) handleSubmit();
            }}
            disabled={submitting}
          >
            {submitting ? 'Submitting...' : 'Submit Exam'}
          </button>
        </div>
      </div>

      <div className="mb-4">
        <h6>Progress</h6>
        <div className="d-flex flex-wrap">
          {questions.map((q, idx) => {
            const answered = !!answers[q._id];
            return (
              <button
                key={q._id}
                className={`btn btn-sm me-2 mb-2 rounded-circle d-flex align-items-center justify-content-center`}
                style={{
                  width: '36px',
                  height: '36px',
                  fontWeight: '600',
                  color: '#fff',
                  backgroundColor: idx === currentIdx ? '#0d6efd' : answered ? '#198754' : '#6c757d',
                  border: 'none'
                }}
                onClick={() => setCurrentIdx(idx)}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Exam;
