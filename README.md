### Roommates Chores App 🧹
*A gamified Progressive Web App for chore tracking among 5 college housemates.*

## Overview
This project is a mobile-first PWA built with **React**, **TypeScript**, and **Supabase** that makes household chores fair and fun through gamification and social incentives.

## Core Features
- Weighted chores with point values
- Personal dashboards + public leaderboard
- Photo verification for chore completion
- Streak tracking and achievement badges
- Weekly/monthly fairness tracking
- Social incentives (red zones, public debt, funny titles)

## Tech Stack
- **Frontend:** React + TypeScript + TailwindCSS (Vite)
- **Backend:** Supabase (Postgres, Auth, Storage, Realtime)
- **Hosting:** Vercel (frontend) + Supabase (backend)
- **Testing:** Jest + React Testing Library + Cypress

## Project Setup

# 1. Clone the repo
```bash
git clone https://github.com/harrymanzler/roommates-chores-app.git
cd roommates-chores-app

# 2. Install Dependencies
npm install

# 3. Add environment variables
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-public-anon-key

# 4. Run the app locally
npm run dev

## Roadmap
- Authentication + User Profiles
- Chore CRUD + Quick Logging
- Leaderboard + Weekly Stats
- Photo Verification Flow
- Streaks + Badges System
- PWA Offline Support