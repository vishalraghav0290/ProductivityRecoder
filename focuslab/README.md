# FocusLab — Habit Tracker

A small web app to track daily habits, visualize progress across a month, and capture simple mental-state metrics (mood & motivation).

This repository contains a lightweight React + TypeScript + Vite project that renders a month view of habits with checkboxes, progress summaries, charts and a sidebar analysis panel.

Key features
- Track multiple habits across a 30-day month view.
- Toggle completion per day and habit.
- Visualize daily aggregated progress with area charts (uses `recharts`).
- View simple mood & motivation timelines.
- Edit habit names in an inline modal.

Tech stack
- React 19 + TypeScript
- Vite (dev server / build)
- Tailwind CSS for styling
- Recharts for charts

Quick start
1. Install dependencies

```bash
npm install
```

2. Run development server

```bash
npm run dev
```

3. Open the app

Open the URL printed by Vite (usually http://localhost:5173).

Project layout (important files)
- `src/pages/HabitTracker.tsx` — page container that keeps app state (habits, habitData, stats calculation, editing state) and composes smaller components.
- `src/components/HabitTracker/` — presentational components:
  - `Header.tsx` — title and summary metrics (now shows current month dynamically)
  - `HabitsTable.tsx` — table layout with checkboxes for each habit/day
  - `ProgressSummary.tsx` — rows for percent done / done / not done per day
  - `ProgressChart.tsx` — area chart for daily progress (recharts)
  - `MentalState.tsx` — mood + motivation rows and chart
  - `AnalysisSidebar.tsx` — right-side habit goals/actual/progress bars
  - `EditModal.tsx` — modal to edit a habit name
  - `types.ts` — shared TypeScript types for the components

Notes about design decisions
- The container (`src/pages/HabitTracker.tsx`) was kept as the single source of truth for state and business logic. The UI pieces are split into presentational components to keep them small and reusable.
- The month shown in the header is computed dynamically from the user's machine locale (via `new Date().toLocaleString(undefined, { month: 'long' })`). If you need a fixed locale or month+year, adjust the code in `src/pages/HabitTracker.tsx`.

Development tips & possible next steps
- Persist state to `localStorage` so toggles survive page reloads.
- Extract stats calculation into a testable helper or `useHabitStats` hook and add unit tests.
- Add CRUD for habits (add/remove/reorder).
- Add responsive improvements for very narrow viewports (horizontal scroll is currently used for the 30-day grid).
- Add E2E tests (Cypress / Playwright) to cover interactions.

Known data/limitations
- The current month view is a fixed 30-day grid (for layout simplicity). If you need true calendar behavior (varying month lengths and real weekday alignment), the table and data structures will need to be adjusted.

License
- This repository does not include a license file by default. Add `LICENSE` if you want to pick one.

Contact / next steps
- If you want I can:
  - extract stats to a hook + add tests, or
  - persist to localStorage and add a simple settings panel,
  - or change the header to show month + year or a fixed locale. Tell me which and I’ll implement it.
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
