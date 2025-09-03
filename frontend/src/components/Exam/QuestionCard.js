import React from 'react';

const QuestionCard = ({ question, selectedOption, onSelect }) => {
  if (!question) return null;

  return (
    <div className="card shadow-sm p-4 rounded-4">
      <div className="mb-3">
        <h5 className="card-title fw-semibold">Question</h5>
        <p className="mb-0">{question.text}</p>
      </div>
      <div className="d-flex flex-column gap-2">
        {question.options.map(opt => {
          const isSelected = selectedOption === opt.key;
          return (
            <button
              key={opt.key}
              type="button"
              onClick={() => onSelect(question._id, opt.key)}
              className={`btn text-start border rounded-3 d-flex align-items-center justify-content-start ${
                isSelected ? 'btn-primary text-white' : 'btn-outline-secondary'
              }`}
              style={{ transition: 'all 0.2s', cursor: 'pointer' }}
            >
              <span className="fw-semibold me-2">{opt.key}.</span>
              <span>{opt.text}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionCard;
