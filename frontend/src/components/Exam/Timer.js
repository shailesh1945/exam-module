import React, { useEffect, useState } from 'react';

const formatTime = (s) => {
  const mm = Math.floor(s / 60).toString().padStart(2, '0');
  const ss = (s % 60).toString().padStart(2, '0');
  return `${mm}:${ss}`;
};

const Timer = ({ initialSeconds, onExpire }) => {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);

  useEffect(() => {
    if (secondsLeft <= 0) {
      onExpire();
      return;
    }
    const t = setInterval(() => {
      setSecondsLeft(s => s - 1);
    }, 1000);
    return () => clearInterval(t);
  }, [secondsLeft, onExpire]);

  const getBgColor = () => {
    if (secondsLeft <= 60) return '#dc3545'; // red
    if (secondsLeft <= 180) return '#ffc107'; // yellow
    return '#198754'; // green
  };

  return (
    <div
      className="d-inline-block px-3 py-2 rounded-pill text-white fw-bold"
      style={{
        backgroundColor: getBgColor(),
        transition: 'background-color 0.3s ease',
        minWidth: '100px',
        textAlign: 'center',
      }}
    >
      {formatTime(secondsLeft)}
    </div>
  );
};

export default Timer;
