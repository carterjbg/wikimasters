## Build a Fullstack Next.js App — Starter Project

This repository contains the starter project files used in Brian Holt's Frontend Masters course "Build a Fullstack Next.js App" (v4). It's a set of step folders that progressively build a minimal, educational wiki application using Next.js (App Router), Tailwind, simple in-memory models, and a handful of realistic but intentionally minimal stubs for features like auth, email, file storage, and AI.

If you're a student: the canonical course content is at https://holt.fyi/fullstack-next — go there to enroll or get the official materials.

Repository with course lesson files: https://github.com/btholt/build-a-fullstack-nextjs-app-v4

---

## What this repo contains

- A series of step folders named `00-start` → `09-with-tests`. Each folder contains a complete snapshot of the project at that step in the course. Use a single step folder at a time.
- Minimal, readable code designed for live coding and student edits — not production-ready. Many features are stubbed (in-memory DB, console-email, echo-AI, local file storage).
- Basic tooling examples: TypeScript, Tailwind, Vitest, Playwright (in later steps).

## How the steps work

Each numbered folder (for example, `00-start`, `01-shadcn`, ... `09-with-tests`) is a full project snapshot representing the code state at that point in the lesson. Typical workflow when following the course:

- Pick the step you want to work on (e.g. `03-auth`).
- Change into that folder: `cd 03-auth`
- Install dependencies, run typecheck/lint/tests, then run the dev server.

This lets you step backwards or forwards through the curriculum and reproduce the instructor's starting state for each live-coding segment.

## Quick setup (per-step)

1. Open a terminal and change to the step folder you want to run:

```bash
cd 00-start
```

2. Install dependencies:

```bash
npm install
```

3. (Optional) Run checks provided in `package.json`:

```bash
npm run typecheck   # TypeScript check
npm run lint        # ESLint
npm run test        # If tests exist for that step which is only 09-with-tests
```

4. Start the dev server:

```bash
npm run dev
```

By default the app will run on `http://localhost:3000` unless the step config overrides the port.

## Secrets / .env

Several steps include features that expect runtime secrets (database URL, third-party API keys, email provider keys, etc.). This starter project intentionally leaves those out — you must provide your own values in a `.env` file in the step folder (or in your shell environment) before running features that require them.

Typical .env items you may need to set (varies by step):

- DATABASE_URL
- NEXTAUTH*URL / NEXT_PUBLIC*... keys
- SMTP / EMAIL provider keys
- VERCEL / OBJECT STORAGE keys

Do not commit secrets to Git. Use environment variables or a secrets manager for real deployments.

## CI notes

- There is a `ci.yaml` workflow in the repository base directory which is intended to coordinate the entire multi-step project (useful for repository-level checks).
- The workflow inside `09-with-tests` is the one you'll most likely copy and adapt for real deployments of your final app — it contains the test/playwright configuration and the specific steps expected for deployment. When in doubt, copy the `09-with-tests` CI workflow into your app's repo/CI pipeline and adapt secrets/config as needed.

## Licensing

- Code in this repo is licensed under the Apache License 2.0.
- Course content is licensed CC-BY-NC-4.0 (attribution + non-commercial).

If you redistribute course materials or code, make sure to follow the terms of those licenses.

## Useful links

- Course (Frontend Masters): https://holt.fyi/fullstack-next
- Course repo (project files only): https://github.com/btholt/build-a-fullstack-nextjs-app-v4
- Course text (for instructor reference): https://fullstack-v4.holt.courses

## Troubleshooting & tips

- Node: use a modern Node LTS (Node 22+ recommended). If you see strange build/type errors, check your Node version.
- Port conflicts: if `3000` is in use, set `PORT=3001 npm run dev` or change the dev server config for the step folder.
- If you add a `.env` file and changes don't appear, restart the dev server.

## Contributing / Student edits

This repo is intentionally minimal so students can replace stubs during the course. If you want to contribute fixes or improvements to the starter files, open a PR against the project repo above. Keep changes small and focused — these folders are used as teaching checkpoints.

In general most issues should go against the course website, not the project files.

## Summary

This repo is a set of reproducible step snapshots for Brian Holt's Frontend Masters course. Pick a step, `npm install`, run the checks, start the dev server, and follow along with the lesson. For deployment, copy/adapt the CI workflow in `09-with-tests` and provide your own secrets via `.env` or your CI secrets manager.
