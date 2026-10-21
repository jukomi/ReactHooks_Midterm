import assert from 'node:assert/strict';
import test from 'node:test';
import { issueReducer } from '../src/exams/6-Issue Tracker State Engine/issueReducer.js';

test('ADD_ISSUE creates an open issue and increments nextId', () => {
  const state = { issues: [], filter: 'all', nextId: 1 };
  const nextState = issueReducer(state, {
    type: 'ADD_ISSUE',
    payload: { title: 'Fix the search field' }
  });

  assert.deepEqual(nextState, {
    issues: [{ id: 1, title: 'Fix the search field', status: 'open' }],
    filter: 'all',
    nextId: 2
  });
  assert.deepEqual(state, { issues: [], filter: 'all', nextId: 1 });
});

test('TOGGLE_ISSUE returns a new issue with the opposite status', () => {
  const state = {
    issues: [{ id: 4, title: 'Update the page header', status: 'open' }],
    filter: 'all',
    nextId: 5
  };
  const nextState = issueReducer(state, {
    type: 'TOGGLE_ISSUE',
    payload: { id: 4 }
  });

  assert.equal(nextState.issues[0].status, 'done');
  assert.notEqual(nextState, state);
  assert.notEqual(nextState.issues[0], state.issues[0]);
  assert.equal(state.issues[0].status, 'open');
});

test('CLEAR_DONE removes completed issues and preserves open issues', () => {
  const state = {
    issues: [
      { id: 1, title: 'Finished task', status: 'done' },
      { id: 2, title: 'Remaining task', status: 'open' }
    ],
    filter: 'done',
    nextId: 3
  };
  const nextState = issueReducer(state, { type: 'CLEAR_DONE' });

  assert.deepEqual(nextState, {
    issues: [{ id: 2, title: 'Remaining task', status: 'open' }],
    filter: 'done',
    nextId: 3
  });
  assert.equal(state.issues.length, 2);
});
