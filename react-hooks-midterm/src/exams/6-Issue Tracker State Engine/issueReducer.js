export const initialState = {
  issues: [],
  filter: 'all',
  nextId: 1
};

export function issueReducer(state, action) {
  switch (action.type) {
    case 'ADD_ISSUE':
      return {
        ...state,
        issues: [
          ...state.issues,
          { id: state.nextId, title: action.payload.title, status: 'open' }
        ],
        nextId: state.nextId + 1
      };
    case 'TOGGLE_ISSUE': {
      const issueExists = state.issues.some((issue) => issue.id === action.payload.id);
      if (!issueExists) return state;

      return {
        ...state,
        issues: state.issues.map((issue) => (
          issue.id === action.payload.id
            ? { ...issue, status: issue.status === 'open' ? 'done' : 'open' }
            : issue
        ))
      };
    }
    case 'DELETE_ISSUE': {
      const issues = state.issues.filter((issue) => issue.id !== action.payload.id);
      return issues.length === state.issues.length ? state : { ...state, issues };
    }
    case 'SET_FILTER':
      if (!['all', 'open', 'done'].includes(action.payload.filter)) return state;
      return { ...state, filter: action.payload.filter };
    case 'CLEAR_DONE': {
      const issues = state.issues.filter((issue) => issue.status !== 'done');
      return issues.length === state.issues.length ? state : { ...state, issues };
    }
    default:
      return state;
  }
}
