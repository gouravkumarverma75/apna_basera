#  ApnaBasera

> **Naye sheher mein, apna basera.**

Apna Basera is a student-focused accommodation discovery platform designed to help students find trustworthy PGs, hostels, and rooms near their college.

Finding a room is easy.  
**Finding a place you can trust is difficult.**

Apna Basera focuses on solving this problem through transparent pricing, property verification, student reviews, trust scores, and a simple discovery experience.

---

## 🚀 Problem Statement

Students moving to a new city often struggle with:

- Finding reliable PGs and rooms
- Fake or misleading property listings
- Hidden deposits and additional charges
- Unclear room conditions
- Lack of trustworthy student reviews
- Difficulty comparing multiple properties
- Not knowing whether a property owner is genuine
- Finding accommodation close to their college

Traditional property platforms often provide listings, but students still have to figure out:

> **"Can I actually trust this place?"**

Apna Basera is designed around that question.

---

## 💡 Our Solution

Apna Basera provides a **trust-first accommodation discovery experience** for students.

Students can:

1. Search for accommodation
2. Filter properties according to their needs
3. Check rent and deposit
4. View amenities
5. Check distance from college
6. See student ratings
7. View a Trust Score
8. Save favourite properties
9. Compare suitable stays
10. Send an enquiry to the property owner

---

# ✨ Key Features

## 🔎 Smart Property Search

Students can search accommodation using:

- Location
- College area
- Maximum budget
- Room type

Example:

> "Find me a single room near ABES under ₹9,000."

---

## 🛡️ Trust Score

Every property can have a Trust Score out of 100.

Example:

```text
              TRUST SCORE

                  94
                 /100

          Excellent

```text
              TRUST SCORE

                  94
                 /100

          Excellent

Owner Verification     100%
Price Transparency      96%
Student Reviews         91%
```

---

# 🚀 Run Locally (Full Stack)

The API runs on **port 5001** (macOS AirPlay uses port 5000).

```bash
# Terminal 1 — backend
cd backend
npm install
npm run dev          # http://localhost:5001

# Terminal 2 — frontend
cd frontend
npm install
npm run dev          # http://localhost:5173
```

The frontend calls the API **same-origin** (`/api`): Vite proxies `/api` to the
backend in development, and Vercel rewrites `/api` to the backend in
production — so no CORS errors in either environment.

# 🚀 Deploy to Production (Vercel, single deploy)

This is a **Vercel Services** project: frontend and backend are built and
deployed together in **one** deployment on **one** domain.

1. Push this repository to GitHub and import the repo root in Vercel.
2. In Project Settings → Build & Deployment, set the **Framework Preset to `Services`**
   (required — otherwise Vercel ignores the `services` key in `vercel.json`).
3. Deploy. Vercel builds the frontend (Vite) and backend (Express) together.
4. Public URL:
   - `your-app.vercel.app/api/*` → backend
   - `your-app.vercel.app/*` → frontend

## Environment variables (all optional)

| Variable          | Where         | Default                                  | Purpose |
| ----------------- | ------------- | ---------------------------------------- | ------- |
| `PORT`            | Backend       | `5001`                                   | Port when running the Express server directly |
| `ALLOWED_ORIGINS` | Backend / Vercel | `http://localhost:5173,http://127.0.0.1:5173` | Comma-separated origins allowed by CORS (only matters if frontend and API are hosted on different domains) |
| `VITE_API_URL`    | Frontend build | `/api` (same-origin)                      | Override if the API is hosted separately |

# 🛠 API Reference

| Method | Path                 | Description                                  |
| ------ | -------------------- | -------------------------------------------- |
| GET    | `/api/health`        | Health check                                 |
| GET    | `/api/properties`    | List properties (filters: `location`, `maxRent`, `verified`, `roomType`, `minTrustScore`, `amenities`), sorted by trust score |
| GET    | `/api/properties/:id`| Single property                              |
| POST   | `/api/enquiries`     | Submit an enquiry (body: `propertyId`, `name`, `phone`, `moveInMonth`) |
| GET    | `/api/enquiries`     | List submitted enquiries                     |
