# CareerPilot

CareerPilot is an AI-powered career management platform designed to help job seekers organize their job search, prepare for interviews, and improve their chances of landing their next role.

Instead of relying on spreadsheets, bookmarks, and multiple websites, CareerPilot brings everything into one place.

---

## Features

### Authentication

- User registration
- Secure login
- JWT authentication
- Protected routes

### Job Tracker

- Save job postings
- Track application status
- Add interview dates
- Store recruiter information
- Personal notes
- Resume version tracking

### AI Resume Analysis

- Compare resume against job descriptions
- Identify missing skills
- Resume match percentage
- Suggestions for improvement

### AI Interview Preparation

- Generate interview questions from job descriptions
- Behavioral interview practice
- Technical interview preparation
- Personalized feedback

### Dashboard

- Total applications
- Interview count
- Offer count
- Rejection tracking
- Response rate
- Progress charts

### Study Recommendations

CareerPilot analyzes interview performance and recommends topics to improve.

---

## Tech Stack

Frontend

- React
- TypeScript
- Tailwind CSS

Backend

- Spring Boot
- Java

Database

- PostgreSQL

Authentication

- Spring Security
- JWT

AI

- OpenAI API

Deployment

- Docker
- GitHub Actions

---

## Project Structure

```
careerpilot/
│
├── frontend/        # React + TypeScript + Vite app (the landing page lives here)
│   ├── src/         # components, pages, lib/supabase.ts
│   ├── .env.local   # your Supabase URL + anon key (gitignored)
│   └── .env.example # template for the above
│
├── backend/         # server-side code & secrets (service_role key, OpenAI key)
│   ├── .env.example
│   └── README.md
│
└── README.md
```

---

## Getting Started

### Frontend

```bash
cd frontend
npm install          # first time only
cp .env.example .env.local   # then fill in your Supabase values
npm run dev          # http://localhost:5173
```

### Backend

The `backend/` folder is a placeholder — add your stack of choice there. See
`backend/README.md` for details. Keep all privileged secrets (service_role key,
OpenAI key) in `backend/.env`, never in the frontend.

---

## Future Features

- Resume Builder
- LinkedIn Integration
- GitHub Integration
- AI Career Coach
- Salary Tracking
- Offer Comparison
- Calendar Sync
- Email Notifications
- Chrome Extension
- Mobile App

---

## Why I Built This

Applying for jobs often means managing information across multiple websites and documents. CareerPilot brings the entire process into one application and adds AI-powered tools that help users prepare for interviews and improve their applications.

The goal is to make the job search more organized, efficient, and personalized.

---

## License

MIT License