# Fintrack — Personal Finance Dashboard

A production-ready personal finance tracker with beautiful D3.js charts, budget analytics, and expense management.

## Stack
- **Frontend**: React 18, D3.js v7, React Router 6 → Deployed on **Vercel**
- **Backend**: Node.js, Express 4 → Deployed on **Render**
- **Database**: PostgreSQL → Render Managed PostgreSQL

## Quick Start (Local)

```bash
# 1. Clone & install
git clone https://github.com/YOUR_USERNAME/fintech-dashboard
cd fintech-dashboard
npm run install:all

# 2. Set up env
cp .env.example .env
# Edit .env with your PostgreSQL URL and JWT secret

# 3. Init database
psql $DATABASE_URL -f server/db/schema.sql

# 4. Run dev
npm run dev
# Frontend: http://localhost:5173
# Backend:  http://localhost:3001
```

## Deploy to Vercel + Render

### Backend → Render
1. Push repo to GitHub
2. Go to [render.com](https://render.com) → New → Blueprint
3. Select your repo — Render reads `render.yaml` automatically
4. It will create: Web Service + PostgreSQL database
5. After deploy, copy the server URL (e.g. `https://fintech-api.onrender.com`)
6. Run `psql $DATABASE_URL -f server/db/schema.sql` from Render shell

### Frontend → Vercel
1. Go to [vercel.com](https://vercel.com) → New Project → Import your repo
2. Vercel auto-detects `vercel.json`
3. Add environment variable: `VITE_API_URL=https://fintech-api.onrender.com/api`
4. Deploy ✓

### After Deploy
- Update `CLIENT_URL` env var on Render to your Vercel URL (for CORS)

## Features
- 📊 D3.js area charts, donut charts, bar charts
- 💰 Income & expense tracking with categories
- 🎯 Budget management with progress bars
- 📈 6-month trend analytics
- ➕ Add/delete transactions inline
- 🌙 Dark theme with beautiful typography

## Project Structure
```
fintech-dashboard/
├── client/          # React frontend (→ Vercel)
│   └── src/
│       ├── components/   # StatCard, TrendChart, DonutChart, BudgetBar, Layout
│       ├── pages/        # Dashboard, Transactions, Budgets, Analytics
│       ├── data/         # Mock data (for demo / offline)
│       └── utils/        # Number formatting
├── server/          # Express API (→ Render)
│   ├── routes/      # auth, transactions, budgets, analytics
│   ├── middleware/  # JWT auth
│   └── db/          # PostgreSQL pool + schema.sql
├── vercel.json      # Vercel config
├── render.yaml      # Render blueprint
└── .env.example
```

## API Endpoints
```
POST   /api/auth/register
POST   /api/auth/login
GET    /api/transactions
POST   /api/transactions
PUT    /api/transactions/:id
DELETE /api/transactions/:id
GET    /api/budgets?month=&year=
POST   /api/budgets
PUT    /api/budgets/:id
GET    /api/analytics/summary?month=&year=
GET    /api/analytics/by-category?month=&year=
GET    /api/analytics/trend?months=6
```
