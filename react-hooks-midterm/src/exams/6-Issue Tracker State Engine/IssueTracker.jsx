import { useState } from 'react';
import { issueReducer, initialState } from './issueReducer';
import { usePersistentReducer } from './usePersistentReducer';

const FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'open', label: 'Open' },
  { value: 'done', label: 'Done' }
];

export default function IssueTracker() {
  const [state, dispatch] = usePersistentReducer(
    issueReducer,
    initialState,
    'issue-tracker-state-v1'
  );
  const [titleInput, setTitleInput] = useState('');

  const counts = state.issues.reduce((total, issue) => ({
    ...total,
    all: total.all + 1,
    [issue.status]: total[issue.status] + 1
  }), { all: 0, open: 0, done: 0 });

  const visibleIssues = state.filter === 'all'
    ? state.issues
    : state.issues.filter((issue) => issue.status === state.filter);

  const handleAddIssue = (event) => {
    event.preventDefault();
    const title = titleInput.trim();
    if (!title) return;

    dispatch({ type: 'ADD_ISSUE', payload: { title } });
    setTitleInput('');
  };

  return (
    <section className="exam-card">
      <h2 className="exam-title">Issue Tracker</h2>

      <form className="inline-form" onSubmit={handleAddIssue}>
        <input
          className="field"
          type="text"
          aria-label="Issue title"
          placeholder="New issue description..."
          value={titleInput}
          onChange={(event) => setTitleInput(event.target.value)}
        />
        <button className="button button-primary" type="submit">
          Add
        </button>
      </form>

      <div className="issue-toolbar">
        <div className="issue-filters" aria-label="Filter issues">
          {FILTERS.map(({ value, label }) => (
            <button
              className={state.filter === value ? 'button button-primary' : 'button button-secondary'}
              type="button"
              aria-pressed={state.filter === value}
              key={value}
              onClick={() => dispatch({ type: 'SET_FILTER', payload: { filter: value } })}
            >
              {label} ({counts[value]})
            </button>
          ))}
        </div>

        <button
          className="button button-secondary"
          type="button"
          disabled={counts.done === 0}
          onClick={() => dispatch({ type: 'CLEAR_DONE' })}
        >
          Clear done
        </button>
      </div>

      <ul className="plain-list issue-list">
        {visibleIssues.length > 0 ? (
          visibleIssues.map((issue) => (
            <li className="issue-row" key={issue.id}>
              <span className={issue.status === 'done' ? 'issue-title issue-title-closed' : 'issue-title'}>
                {issue.title}
              </span>

              <div className="issue-actions">
                <button
                  className="button button-secondary"
                  type="button"
                  onClick={() => dispatch({ type: 'TOGGLE_ISSUE', payload: { id: issue.id } })}
                >
                  Mark {issue.status === 'open' ? 'done' : 'open'}
                </button>

                <button
                  className="button button-danger"
                  type="button"
                  onClick={() => dispatch({ type: 'DELETE_ISSUE', payload: { id: issue.id } })}
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        ) : (
          <li className="empty-state">No {state.filter === 'all' ? '' : `${state.filter} `}issues.</li>
        )}
      </ul>
    </section>
  );
}
