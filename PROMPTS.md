# ABTalks — AI Usage Log

## Project

ABTalks — 60-Day Coding Challenge Platform

## Overview

This project was developed using an AI-assisted / vibe-coding workflow. AI tools were used for planning, UI/UX development, implementation guidance, debugging, testing, API development, responsive design, and deployment troubleshooting.

## AI Tools Used

- ChatGPT
- Antigravity
- GitHub Copilot / VS Code AI

---

## 1. Problem Understanding and Planning

AI assistance was used to understand the ABTalks redesign requirements and plan the core student experience.

### Representative Prompt

> Design a mobile-first experience for ABTalks, a 60-day coding challenge for college students. The platform should help students understand the challenge, complete daily tasks, submit GitHub and LinkedIn proof, and track their progress.

The requirements were translated into three primary routes:

- `/`
- `/dashboard`
- `/day/12`

---

## 2. Landing Page Development

AI assistance was used to design the landing page for students who had never used ABTalks.

### Representative Prompt

> Create a modern mobile-first landing page for a 60-day coding challenge. Clearly communicate the value of the challenge, build trust, motivate students to start, and keep the experience simple on a 390px mobile viewport.

The resulting page focuses on:

- 60-day challenge messaging
- Student motivation
- Progress and streak concepts
- Clear calls to action
- Responsive design

---

## 3. Student Dashboard

AI assistance was used to design the student dashboard as the main daily command center.

### Representative Prompt

> Build a student dashboard for a 60-day coding challenge showing the current streak, today's task, challenge progress, completion percentage, achievements, and student standing. Prioritize the information a student needs to continue today's work.

The dashboard was designed around the daily decision flow:

**What have I done? → What do I need to do today? → How do I submit proof? → What's next?**

---

## 4. Challenge Day Experience

AI assistance was used to develop the individual challenge-day experience at `/day/12`.

### Representative Prompt

> Create a complete Day 12 challenge experience where a student can understand the task, see what needs to be built, submit GitHub repository or commit proof, submit LinkedIn proof, and complete the day.

The implementation includes:

- Day-specific challenge information
- Task requirements
- Build guidance
- GitHub proof submission
- LinkedIn proof submission
- Completion state
- Progress toward the next day

---

## 5. Onboarding Experience

AI assistance was used to improve the first-time student experience and make the platform easier to understand.

### Representative Prompt

> Design a polished onboarding flow for a student joining a 60-day coding challenge. Make the experience motivating, clear, mobile-first, and focused on helping the student understand how the daily challenge works.

The onboarding experience introduces the challenge workflow and helps reduce the initial learning curve.

---

## 6. Streak, Progress and Achievement System

AI assistance was used to implement the progress and motivation elements of the platform.

### Representative Prompt

> Create a realistic student progress system for a 60-day coding challenge including streaks, completion percentage, achievements, daily progress, and student standing.

The interface also considers different student states such as:

- Active streak
- Missed day
- First-day / zero-streak state
- Empty profile state
- Completed challenge day

---

## 7. GitHub and LinkedIn Proof Submission

AI assistance was used to implement and debug the proof-of-work workflow.

### Representative Tasks

> Add GitHub repository/commit proof submission to the daily challenge.

> Add LinkedIn post proof submission.

> Connect the proof submission forms to the corresponding API endpoints.

> Add validation, error handling, and successful submission feedback.

The proof workflow was designed to make the daily submission process simple and clear for students.

---

## 8. Authentication and Student Session

AI assistance was used to implement a lightweight mocked authentication/session flow.

### Representative Tasks

> Create an email-based login experience for the challenge platform.

> Persist the signed-in student state.

> Add logout functionality.

> Protect student-related API routes.

Authentication was implemented as part of the mocked application experience because production authentication was outside the hackathon scope.

---

## 9. API Development

AI assistance was used to develop and connect the frontend with serverless API endpoints.

### Representative Tasks

- Implement challenge data endpoints.
- Implement dashboard data.
- Implement student progress.
- Implement achievements.
- Implement GitHub proof submission.
- Implement LinkedIn proof submission.
- Implement Day 12 completion.
- Implement authentication/session handling.
- Implement recruiter and admin workspace data.

The application uses mocked data and serverless API handlers as permitted by the problem statement.

---

## 10. API Debugging and Testing

AI assistance was used to investigate API request failures and verify the deployed application.

### Representative Tasks

> Test the Day 12 API endpoint.

> Test GitHub proof submission.

> Test LinkedIn proof submission.

> Test Day 12 completion.

> Identify and fix incorrect API request paths.

> Verify that the frontend communicates correctly with the deployed API.

These changes helped ensure that the proof submission and challenge completion flows worked correctly after deployment.

---

## 11. Vercel Deployment Troubleshooting

AI assistance was used during deployment and production debugging.

### Representative Tasks

> Verify the production build.

> Configure the project for Vercel deployment.

> Investigate deployment failures.

> Fix Vercel API routing issues.

> Resolve the serverless function limit.

> Consolidate API functionality where necessary.

The API architecture was adjusted to remain compatible with the Vercel deployment environment.

---

## 12. Responsive and Mobile-First Development

AI assistance was used to refine the interface for the required 390px mobile viewport.

### Representative Prompt

> Review the ABTalks interface as a mobile-first product. Ensure the main content, cards, buttons, forms, navigation, and challenge workflow remain usable at 390px width without horizontal overflow.

The application was tested across:

- Desktop browser
- Mobile viewport
- Physical mobile device

---

## 13. Recruiter and Admin Workspaces

Additional workspace functionality was implemented to support the broader platform concept.

### Representative Prompt

> Create separate recruiter and admin workspace experiences using realistic mocked data while keeping the main student experience focused on the 60-day challenge.

These workspaces were kept separate from the three required submission routes.

---

## 14. UI/UX Refinement

AI assistance was used throughout development to improve:

- Visual hierarchy
- Spacing
- Typography
- Cards
- Buttons
- Progress indicators
- Empty states
- Error states
- Completion states
- Mobile responsiveness
- Interaction feedback

The goal was to create a polished experience rather than simply satisfying the functional requirements.

---

## 15. Testing and Verification

AI assistance was used to review and verify the final implementation.

### Verification Included

- Production build verification
- API endpoint testing
- Route testing
- Proof submission testing
- Challenge completion testing
- Responsive layout testing
- Desktop browser testing
- Mobile testing
- Vercel deployment verification

The required routes were verified:

```text
/
/dashboard
/day/12
