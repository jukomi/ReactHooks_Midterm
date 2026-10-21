import { useState, useEffect } from 'react';

const USERS = [
  { id: 1, name: 'Ana Cruz', role: 'Developer' },
  { id: 2, name: 'Ben Lim', role: 'Designer' },
  { id: 3, name: 'Cara Yu', role: 'Tester' },
  { id: 4, name: 'Dan Go', role: 'Developer' }
];

export default function LiveSearchTimer() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(USERS);
  const [seconds, setSeconds] = useState(0);

  // 1. Debounced search effect with cleanup
  useEffect(() => {
    const handler = setTimeout(() => {
      setResults(
        USERS.filter((user) =>
          user.name.toLowerCase().includes(query.toLowerCase())
        )
      );
    }, 300);

    return () => clearTimeout(handler);
  }, [query]);

  // 2. Document title synchronization
  useEffect(() => {
    document.title = `Visible Results: ${results.length}`;
  }, [results]);

  // 3. One-second session timer effect
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="exam-card">
      <h2 className="exam-title">Live Search and Session Timer</h2>

      <div className="status-line">
        <span className="status">Session time: <strong>{seconds}s</strong></span>
      </div>

      <div className="field-group">
        <input
          className="field"
          type="text"
          placeholder="Search users by name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <ul className="plain-list">
        {results.length > 0 ? (
          results.map((u) => (
            <li className="list-row" key={u.id}>
              <span className="list-primary">{u.name}</span>
              <span className="list-secondary">{u.role}</span>
            </li>
          ))
        ) : (
          <li className="empty-state">No users found.</li>
        )}
      </ul>
    </section>
  );
}