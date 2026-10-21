import { useEffect, useState } from 'react';

export default function SmartTaskCounter() {
  const [count, setCount] = useState(0);
  const [target] = useState(5);

  useEffect(() => {
    document.title = `Task Count: ${count}`;
  }, [count]);

  const handleAddTwo = () => {
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
  };

  const handleIncrement = () => {
    if (count < target) setCount((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setCount((prev) => Math.max(0, prev - 1));
  };

  const handleReset = () => {
    setCount(0);
  };

  const getStatus = () => {
    if (count === 0) return { label: 'Not started', color: '#6b7280' };
    if (count >= target) return { label: 'Target reached', color: '#15803d' };
    return { label: 'In progress...', color: '#795548' };
  };

  const isTargetReached = count >= target;
  const status = getStatus();

  return (
    <section className="exam-card">
      <h2 className="exam-title">Smart Task Counter</h2>

      <div className="counter-value">
        {count} <span>/ {target}</span>
      </div>

      <div className="status-line">
        <span className="status" style={{ color: status.color }}>
          {status.label}
        </span>
      </div>

      <div className="button-grid">
        <button
          className="button button-primary"
          onClick={handleIncrement}
          disabled={isTargetReached}
        >
          +1 Increment
        </button>

        <button
          className="button button-primary"
          onClick={handleAddTwo}
          disabled={isTargetReached}
        >
          +2 Increment
        </button>
      </div>

      <div className="button-grid button-grid-spaced">
        <button
          className="button button-secondary"
          onClick={handleDecrement}
        >
          -1 Decrement
        </button>

        <button
          className="button button-secondary"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
    </section>
  );
}