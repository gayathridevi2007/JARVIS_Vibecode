# ABTalks — AI Usage Log

## Project

**ABTalks — 60-Day Coding Challenge Platform**

ABTalks is a mobile-first platform designed around a 60-day coding challenge for college students. Students complete daily coding tasks, submit GitHub and LinkedIn proof of work, and track their progress and consistency.

## AI Tools Used

- ChatGPT
- Antigravity
- GitHub Copilot / VS Code AI

AI was used as a development assistant for planning, implementation, debugging, testing, responsive design, architecture decisions, and deployment troubleshooting. Final implementation decisions, testing, and verification were performed during development.

---

## 1. Project Planning and Architecture

### Prompt

> Analyze the ABTalks 60-day coding challenge requirements and propose a practical architecture for a mobile-first web application. The required student experiences are the landing page, student dashboard, and individual challenge-day page. Prioritize maintainability, responsive design, simple API integration, and a clear daily workflow.

### AI Assistance

Used to structure the application, identify the major user flows, plan reusable components, and determine the separation between frontend routes, API handlers, shared state, and services.

---

## 2. Landing Page

### Prompt

> Design and implement a professional mobile-first landing page for ABTalks, a 60-day coding challenge for college students. A first-time visitor should immediately understand what ABTalks is, why completing the challenge is valuable, how the daily workflow works, and how to get started. Optimize the primary experience for a 390px mobile viewport.

### AI Assistance

Used for layout structure, responsive styling, visual hierarchy, CTA placement, messaging, and mobile-first implementation.

---

## 3. Student Dashboard

### Prompt

> Build the ABTalks student dashboard as the student's daily command center. Show the current streak, today's challenge, challenge progress, overall completion, achievements, student standing, and the most important next action. Keep the interface focused and easy to scan on a mobile device.

### AI Assistance

Used to design the dashboard information hierarchy, progress components, cards, responsive layouts, and interaction flow.

---

## 4. Challenge Day Experience

### Prompt

> Implement the complete Day 12 challenge experience. The student must be able to understand the day's objective, requirements, expected output, and proof-of-work process. Provide GitHub and LinkedIn proof submission, validation, submission feedback, and a clear completion action.

### AI Assistance

Used for the challenge page structure, task presentation, submission UI, completion states, validation, and API integration.

---

## 5. Onboarding Experience

### Prompt

> Create a concise onboarding experience for a student joining the ABTalks 60-day challenge. Explain the daily workflow, expectations, proof-of-work requirement, and motivation without overwhelming the user. Design it mobile-first and include meaningful progress cues.

### AI Assistance

Used to refine onboarding structure, copy hierarchy, visual flow, and mobile presentation.

---

## 6. Progress, Streaks, and Achievements

### Prompt

> Implement realistic challenge progress tracking for a 60-day coding challenge. Include daily completion, current streak, overall completion percentage, achievements, and student standing. Handle first-day users, zero streaks, missed days, completed days, and empty states.

### AI Assistance

Used to design progress calculations, UI states, achievement presentation, and edge-case handling.

---

## 7. GitHub Proof Submission

### Prompt

> Implement GitHub proof submission for the daily challenge. Accept a repository or commit URL, validate the input, send it to the appropriate API endpoint, handle API failures, and provide clear success feedback to the student.

### AI Assistance

Used for form validation, API integration, error handling, and confirmation states.

---

## 8. LinkedIn Proof Submission

### Prompt

> Implement LinkedIn proof submission for the daily challenge. Accept a LinkedIn post URL, validate the input, connect the form to the backend endpoint, and provide clear success and failure feedback.

### AI Assistance

Used for form behavior, validation, API integration, and user feedback.

---

## 9. Challenge Completion

### Prompt

> Connect the GitHub and LinkedIn proof workflow to challenge completion. A student should only be able to complete the challenge after the required proof workflow has been satisfied. On completion, update the student's progress and prepare the next challenge state.

### AI Assistance

Used for completion logic, state updates, API integration, and UI feedback.

---

## 10. Authentication and Session Handling

### Prompt

> Implement a lightweight email-based authentication flow for the ABTalks prototype. Create a login page and API endpoint, persist the authenticated student session, protect student routes and API requests, support logout, and preserve the session after page refresh.

### AI Assistance

Used for the login flow, session persistence, protected routes, API headers, and authentication-related debugging.

---

## 11. API Implementation

### Prompt

> Implement the backend API structure required by the ABTalks platform. Provide endpoints for authentication, student state, dashboard data, progress, achievements, challenge data, challenge completion, GitHub proof, and LinkedIn proof. Keep the API handlers modular and compatible with Vercel serverless deployment.

### AI Assistance

Used for API handler structure, request validation, state management, response handling, and frontend/backend integration.

---

## 12. API Debugging

### Prompt

> Inspect the ABTalks frontend-to-backend request flow and verify the API paths used by authentication, Day 12, GitHub proof, LinkedIn proof, and challenge completion. Identify incorrect request paths or deployment-specific routing issues and fix them without changing existing functionality.

### AI Assistance

Used to trace API requests, diagnose incorrect paths, test endpoints, and correct deployment-related request failures.

---

## 13. Mobile-First Responsive QA

### Prompt

> Review the ABTalks application at a 390px mobile viewport. Identify horizontal overflow, compressed controls, text truncation, oversized elements, spacing problems, navigation issues, and form usability problems. Fix these issues while preserving the desktop layout.

### AI Assistance

Used to identify and resolve mobile layout issues across the application.

---

## 14. Recruiter Workspace

### Prompt

> Implement an isolated recruiter workspace using realistic mocked data. Provide candidate discovery, progress information, student activity, and useful recruiter-facing insights. Keep this workspace separate from the core student experience and make it responsive.

### AI Assistance

Used for the recruiter workspace UI, mock API integration, responsive layouts, and role-specific navigation.

---

## 15. Admin Workspace

### Prompt

> Implement an isolated admin workspace using mocked data. Provide platform statistics, student activity, challenge monitoring, and administrative insights. Do not modify or break the existing student dashboard and challenge workflow.

### AI Assistance

Used for the admin workspace, mock API integration, filtering UI, responsive behavior, and preservation of existing functionality.

---

## 16. Vercel Deployment

### Prompt

> Prepare the ABTalks application for Vercel production deployment. Verify the Vite production build, API routing, SPA routes, serverless functions, rewrites, and deployment configuration. Identify and resolve deployment-specific problems without changing the required student experience.

### AI Assistance

Used for deployment configuration, production build verification, routing diagnosis, and Vercel troubleshooting.

---

## 17. Serverless Function Optimization

### Prompt

> Inspect the number and structure of Vercel serverless functions in the ABTalks project. The deployment must remain within the Vercel Hobby plan function limit. Consolidate appropriate recruiter and admin functionality while preserving their existing frontend routes and API behavior.

### AI Assistance

Used to identify the function-limit issue, consolidate workspace APIs, relocate shared server-side state, update imports, and configure Vercel rewrites.

---

## 18. Production Build Verification

### Prompt

> Run a production build of the ABTalks application and identify TypeScript, Vite, dependency, or compilation errors. Resolve the issues required for a clean production build and verify the build again.

### AI Assistance

Used for build diagnosis, TypeScript error resolution, and production verification.

---

## 19. Final QA

### Prompt

> Perform a final QA review of the ABTalks application. Verify the landing page, dashboard, Day 12 challenge, authentication flow, GitHub proof submission, LinkedIn proof submission, challenge completion, mobile responsiveness, loading states, error states, empty states, and deployed application behavior.

### AI Assistance

Used to create the final verification checklist and identify remaining implementation or UX issues.

---

## 20. Hackathon Submission Review

### Prompt

> Review the completed ABTalks application against the hackathon requirements. Verify the required routes `/`, `/dashboard`, and `/day/12`, 390px mobile usability, first-day handling, missed-day handling, empty states, proof submission, thoughtful UX improvements, public repository accessibility, live deployment, README documentation, and AI Usage Log requirements. Identify any remaining submission blockers.

### AI Assistance

Used for final requirements verification and submission-readiness review.

---

## AI Usage Summary

AI assistance was used throughout the development lifecycle as a development partner rather than as a replacement for implementation and verification.

Major areas of AI-assisted work included:

- Product and UX planning
- React and TypeScript implementation
- Responsive/mobile-first UI development
- API implementation
- Authentication and session handling
- GitHub and LinkedIn proof workflows
- Progress and streak logic
- Recruiter and Admin workspace development
- Debugging and API verification
- Vercel deployment troubleshooting
- Serverless architecture optimization
- Production build verification
- Final QA and hackathon requirement review

AI assistance was used throughout the development lifecycle as a development partner for planning, implementation, debugging, testing, responsive design, and deployment troubleshooting.

The prompts above represent the major development tasks and decisions assisted by AI.
