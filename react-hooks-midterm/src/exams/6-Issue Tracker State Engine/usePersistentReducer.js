import { useEffect, useReducer } from 'react';

function loadState(storageKey, fallbackState) {
  const serializedState = window.localStorage.getItem(storageKey);
  if (serializedState === null) return fallbackState;

  const state = JSON.parse(serializedState);
  const validState = state
    && Array.isArray(state.issues)
    && ['all', 'open', 'done'].includes(state.filter)
    && Number.isInteger(state.nextId)
    && state.nextId > 0
    && state.issues.every((issue) => (
      Number.isInteger(issue.id)
      && typeof issue.title === 'string'
      && ['open', 'done'].includes(issue.status)
    ));

  if (!validState) {
    throw new Error(`Invalid saved issue tracker state in localStorage key "${storageKey}".`);
  }

  return state;
}

export function usePersistentReducer(reducer, initialState, storageKey) {
  const [state, dispatch] = useReducer(
    reducer,
    initialState,
    (fallbackState) => loadState(storageKey, fallbackState)
  );

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(state));
  }, [state, storageKey]);

  return [state, dispatch];
}
