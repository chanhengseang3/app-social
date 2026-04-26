# Team Connect

TeamConnect is a UI-focused internal social networking app prototype for employees in a growing startup company.

## Current Scope
- React front-end with live authentication
- Team and content screens still use local mock data
- Login and registration connect to the NestJS API

## Run Locally
- `npm install`
- Copy `.env.example` to `.env` if you need a custom API URL
- `npm run dev`
- `npm run build`

## API Configuration
- Default auth API: `http://localhost:3000/api`
- Override with `VITE_API_BASE_URL` in `.env`

## Key Files
- `docs/requirement.md`: product and technical requirements
- `src/App.jsx`: main TeamConnect UI
- `src/mock-data/teamConnectMockData.js`: demo content for React screens
