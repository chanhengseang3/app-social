# Repository Guidelines

## Project Structure & Module Organization
This repository is currently documentation-first with early front-end assets. Keep planning material in [`docs/`](docs/), with product requirements in [`docs/requirement.md`](docs/requirement.md). Store React source files under `src/`, and keep reusable demo content in [`src/mock-data/`](src/mock-data/). Group future UI features by domain, for example `src/auth/`, `src/profile/`, and `src/messaging/`.

## Build, Test, and Development Commands
No build, test, or local development scripts are configured yet. Before introducing a framework, document the chosen commands in `README.md` and keep them consistent here. For now, contributors should use simple validation commands while editing docs:

```sh
git status
git diff -- docs/ README.md AGENTS.md
```

If you add tooling later, prefer predictable script names such as `npm run dev`, `npm run build`, `npm test`, and `npm run lint`.

## Coding Style & Naming Conventions
Use Markdown for planning documents and keep sections short, factual, and task-oriented. Name documentation files in lowercase with hyphens when needed, for example `system-overview.md`. For future code, use 2-space indentation in web-facing files, choose descriptive feature-based names, and match folder names to the domain language already used in the requirements, such as `announcements`, `news`, and `knowledge-base`.

## Testing Guidelines
There is no automated test suite yet. When code is introduced, add tests in a parallel structure such as `tests/` or alongside modules with a `.test` or `.spec` suffix, and document the exact command used to run them. At minimum, new features should include a verification note covering authentication, messaging, and role-based internal tools where relevant.

## Commit & Pull Request Guidelines
Current history uses short, imperative commit subjects, for example `Initial commit`. Continue with concise messages like `Add announcement requirements` or `Create auth module scaffold`. Pull requests should include a short summary, the reason for the change, linked issue or task references when available, and screenshots for UI work. Update `README.md` or `docs/` whenever the project structure or workflow changes.

## Security & Configuration Tips
Do not commit secrets, employee data, or environment-specific credentials. Keep sample data anonymized, and document required configuration in versioned example files such as `.env.example` once runtime settings exist.
