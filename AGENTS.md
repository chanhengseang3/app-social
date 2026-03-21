# Repository Guidelines

## Project Structure & Module Organization
This repository contains a React + Vite front-end prototype. Keep planning material in [`docs/`](docs/), with product requirements in [`docs/requirement.md`](docs/requirement.md). Store React source files under `src/`, and keep reusable demo content in [`src/mock-data/`](src/mock-data/). The current UI entry points are `src/main.jsx`, `src/App.jsx`, and `src/styles.css`.

## Build, Test, and Development Commands
Use the project scripts below:

```sh
npm install
npm run dev
npm run build
```

`npm run dev` starts the local Vite server. `npm run build` creates the production bundle in `dist/`.

## Coding Style & Naming Conventions
Use Markdown for planning documents and keep sections short, factual, and task-oriented. Name documentation files in lowercase with hyphens when needed, for example `system-overview.md`. For future code, use 2-space indentation in web-facing files, choose descriptive feature-based names, and match folder names to the domain language already used in the requirements, such as `announcements`, `news`, and `knowledge-base`.

## Testing Guidelines
There is no automated test suite yet. For now, verify changes with `npm run build` before submitting. When tests are added, place them in a parallel structure such as `tests/` or alongside components with a `.test` or `.spec` suffix, and cover key UI flows like authentication, directory search, messaging, and form submission.

## Commit & Pull Request Guidelines
Current history uses short, imperative commit subjects, for example `Initial commit`. Continue with concise messages like `Add announcement requirements` or `Create auth module scaffold`. Pull requests should include a short summary, the reason for the change, linked issue or task references when available, and screenshots for UI work. Update `README.md` or `docs/` whenever the project structure or workflow changes.

## Security & Configuration Tips
Do not commit secrets, employee data, or environment-specific credentials. Keep sample data anonymized, and document required configuration in versioned example files such as `.env.example` once runtime settings exist.
