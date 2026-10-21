# React Hooks Practical Exam

This app contains six examples of React Hooks. Select an exam from the header to view it.

## Run and test

Run `npm install`, then `npm run dev` to start the app. Run `npm test`, `npm run lint`, and `npm run build` to check the tests, lint, and production build.

## 1. Smart Task Counter

Uses `useState` for the count and a target initialized to 5. The controls increment by one or two, decrement without going below zero, and reset the count. The status is Not started, In progress, or Target reached. Increment and plus two disable once the count reaches or passes the target. Plus two uses two queued functional updates, so using it at count 4 raises the count to 6. Two direct `setCount(count + 1)` calls would use the same captured count and only increment once. A `useEffect` updates the document title when the count changes.

## 2. Live Search and Session Timer

Uses `useState` and `useEffect` for a debounced search and a session timer. Search results update 300 ms after typing stops; the effect cleanup cancels an outdated timeout. A one-second interval updates the timer and is cleared when the component unmounts. The document title shows the number of visible results.

### Timer debugging notes

- **Repeated effect:** An effect that updates a state value and depends on that same value can run repeatedly. This timer sets up its interval once with an empty dependency array (`[]`).
- **Stale closure:** An interval that adds to a captured `seconds` value can keep using the initial value. `setSeconds(prev => prev + 1)` uses the latest state instead.
- **Cleanup:** `clearTimeout` cancels the previous search when the query changes. `clearInterval` stops the timer when the component unmounts.

## 3. Accessible Form Toolkit

The name, email, and password fields are controlled by `useState`. Submission checks that each field is filled, the email matches a basic format, and the password has at least eight characters. The form focuses the first invalid field in name, email, password order. It focuses the name field on mount and after a successful submission.

The form stores the last submitted email in a ref and copies it to display state on the next successful submission. Changing `ref.current` alone does not cause a render. The state updates for a successful submission render the current and previous email. Error messages are associated with their inputs for screen readers.

## 4. Application Preferences

`PreferencesProvider` shares the theme, font size, and update functions through one exported context object. The component tree is `PreferencesProvider > Dashboard > (Toolbar > PreferencesPanel, ArticlePreview)`. The dashboard and article preview both update when the theme changes; the preview also responds to 14px, 16px, and 18px font sizes. `usePreferences` throws an error if called outside the provider. Context lets the panel and preview read shared settings without passing preference props through intermediate components.

## 5. Product Explorer

The example displays 500 generated iPhone and AirPods products with varied prices, meeting the assignment's minimum of 500 records. Search by name, filter by category (Phones or Audio), and sort by price. `useMemo` recalculates the visible list only when the search, category, or sort order changes; including `query` prevents stale search results. `useCallback` keeps the selection handler stable, and `memo` prevents `ProductList` from rendering when its props have not changed. The handler uses the selected product passed to it rather than a captured product value. Use the unrelated counter and theme toggle to check the browser console: they should not cause a `ProductList rendered` message. Filtering, sorting, or searching does render the list. Side effects such as analytics belong in `useEffect`, not inside `useMemo`.

Memoization is unnecessary for a small, cheap calculation that has no measured performance impact. In that case, ordinary filtering is simpler than adding `useMemo` and maintaining its dependencies.

## 6. Issue Tracker

`useReducer` manages issues, the selected filter, and the next ID. You can add issues, toggle them between Open and Done, delete them, filter by All/Open/Done, and clear completed issues. Counts update with each action. `usePersistentReducer` loads and saves the state in `localStorage`. Reducer actions use matching `payload` shapes, return new objects for changed state, and return the existing state for unknown actions.

Run `npm test` to test the reducer's add, toggle, and clear-done actions. To check persistence, add or update issues in the app, refresh the page, and confirm the state is restored.

**Limitations:** Product names are repeated to create 500 demo records, and prices are randomly generated on each page load. Issue data is saved in the current browser's `localStorage`; it is not shared between browsers or devices.
