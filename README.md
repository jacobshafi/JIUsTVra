# Autarc Comments

A local-first, real-time, threaded comment system built with React, TypeScript, and IndexedDB (Dexie).
Includes full test coverage with Vitest and React Testing Library.

---

## Features

- Add, delete, and edit comments
- Nested (threaded) replies
- Real-time sync across multiple tabs (using BroadcastChannel)
- Local persistence (IndexedDB, via Dexie)
- Modern, accessible UI (Tailwind CSS)
- Fully tested (Vitest + React Testing Library)

---

## Getting Started

### 1. **Install dependencies**

```bash
npm install
```

### 2. **Start the development server**

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Running Tests

### 1. **Run all tests once**

```bash
npx vitest run
```

### 2. **Run tests in watch mode**

```bash
npx vitest
```

### 3. **Check test coverage**

```bash
npx vitest run --coverage
```

---

## Project Structure

```
src/
  components/      # React components (Comment, ThreadPanel, etc.)
  hooks/           # Custom hooks (useComments)
  db/              # IndexedDB setup (Dexie)
  index.css        # Tailwind CSS
  App.tsx          # Main app entry
  main.tsx         # ReactDOM entry
  setupTests.ts    # Test setup (jest-dom)
```

---

## Tech Stack

- **React** (with TypeScript)
- **Dexie** (IndexedDB wrapper)
- **Tailwind CSS** (styling)
- **Vitest** (test runner)
- **@testing-library/react** (component testing)
- **@testing-library/user-event** (user interaction testing)
- **@testing-library/jest-dom** (custom matchers)

---

## Notes

- All comments are stored locally in your browser (no backend required).
- Comments sync in real-time across multiple tabs/windows.
- To clear all comments, clear your browser's IndexedDB for this site.

---

## Scripts

- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run preview` — Preview production build
- `npx vitest` — Run tests in watch mode
- `npx vitest run` — Run all tests once

---

## License

MIT 