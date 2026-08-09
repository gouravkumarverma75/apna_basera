# Apna Basera

Dark, trust-first student accommodation MVP.

## Run backend
```bash
cd backend
npm install
npm run dev
```

## Run frontend (new terminal)
```bash
cd frontend
npm install
npm run dev
```

Open the Vite URL, normally http://localhost:5173.
Backend: http://localhost:5000/api/health

No database or external backend APIs are required.

## Demo data / no-backend mode

The frontend contains sample property data in `frontend/src/utils/mockProperties.js`.
If the Express backend is not running, the frontend automatically falls back to this
sample data. This is useful for hackathon demos: **Find My Basera** and property
details still work without a database or external API.

The Express backend remains available for the full frontend + backend demo.
# APNA_BASERA
