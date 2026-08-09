# ABTalks — 60-Day Coding Challenge

A modern, mobile-first web application designed for students participating in the ABTalks 60-Day Coding Challenge. The platform helps students build consistent coding habits through daily challenges, progress tracking, proof submission, and achievements.

## Live Demo

https://jarvis-vibecode.vercel.app

## Repository

https://github.com/gayathridevi2007/JARVIS_Vibecode

## Routes

- `/` — Landing and onboarding
- `/dashboard` — Student progress dashboard
- `/day/12` — Day 12 challenge and proof submission
- `/recruiter` — Recruiter workspace
- `/admin` — Admin workspace

## Key Features

- 60-day coding challenge
- Daily coding tasks and learning objectives
- Current and best streak tracking
- Progress and completion tracking
- GitHub proof submission
- LinkedIn proof submission
- Achievement tracking
- Student standing and percentile
- Streak recovery experience
- Loading, error, and empty states
- Mobile-first responsive design
- Recruiter talent discovery workspace
- Admin platform management workspace

## User Flow

1. Discover the 60-day challenge.
2. Access the student dashboard.
3. Open the current daily challenge.
4. Complete the required coding task.
5. Submit GitHub and LinkedIn proof.
6. Complete the challenge day.
7. Track progress, streaks, and achievements.

## Technology Stack

- React
- TypeScript
- Vite
- React Router
- Tailwind CSS
- Framer Motion
- Lucide React
- Node.js
- Vercel Serverless Functions
- Express
- Git and GitHub

## Project Structure

```text
src/        Frontend application
api/        Serverless API endpoints
lib/        Shared application logic
tests/      API tests
server.cjs  Local API server
vercel.json Vercel configuration
PROMPTS.md  AI-assisted development log
API

The application provides API endpoints for:

Authentication
Student sessions
Dashboard data
Daily challenge data
Progress tracking
Achievements
GitHub proof submission
LinkedIn proof submission
Recruiter workspace
Admin workspace

The recruiter and admin workspaces use mock data for demonstration purposes.

AI-Assisted Development

AI tools were used during development for:

Product and UX planning
React and TypeScript implementation
Mobile-first UI development
API implementation
Authentication and session handling
GitHub and LinkedIn proof workflows
Progress and streak logic
Recruiter and admin workspace development
Debugging and API verification
Responsive design improvements
Vercel deployment troubleshooting
Production build verification

The complete AI-assisted development record is available in PROMPTS.md.

Local Development

Install dependencies:

npm install

Start the development server:

npm run dev

Build the project:

npm run build
Deployment

The application is deployed using Vercel.

Live application:

https://jarvis-vibecode.vercel.app

Hackathon

Built for the ABTalks VibeCode Hackathon.
