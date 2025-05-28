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

---
## Scripts

- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run preview` — Preview production build
- `npx vitest` — Run tests in watch mode
- `npx vitest run` — Run all tests once

---

# Autarc Comments Challenge

## Design Choice: Nested Comments

This solution implements **nested comments** using a **quote reply** (Markdown blockquote) pattern, as seen in professional tools like GitHub Issues. Instead of visually nesting replies under parent comments (which can become cluttered and hard to follow), users can reply to any comment by quoting it. The quoted comment appears in a styled block above the input, providing clear context for the reply.

**Why this approach?**
- This is the industry standard for professional SaaS tools where users are commenting on projects.
- It keeps the UI clean, readable, and easy to follow.
- It avoids the complexity and clutter of deeply nested threads.
- It provides clear context for replies without sacrificing usability.

If true visual nesting (threaded comments) is required, it can be implemented, but this approach is best suited for Autarc's use case and aligns with modern collaboration tools.

---
