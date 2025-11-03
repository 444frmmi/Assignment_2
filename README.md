# Assignment 2 - Frontend (Vite + React + Tailwind)

## Setup

1. Rename `.env.example` to `.env` and (optionally) edit:
```
VITE_API_BASE_URL=https://assignment-1-1-1mvy.onrender.com
VITE_DRONE_ID=66010262
```

2. Install dependencies:
```bash
npm install
```

3. Run dev server:
```bash
npm run dev
# open http://localhost:5173
```

## Build
```
npm run build
```

## Notes
- This project expects the backend API (Assignment 1) to be reachable at `VITE_API_BASE_URL` and to support:
  - GET /configs/:droneId
  - GET /status/:droneId
  - GET /logs/:droneId
  - POST /logs
- If you see CORS errors, enable CORS on the backend or allow the frontend origin.
