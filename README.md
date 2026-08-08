# JARVIS Vibecode

> An interactive web platform built for the Vibecode Hackathon to help participants access challenges, track progress, and submit proof of their work.

---

##  Overview

**JARVIS Vibecode** is a web-based hackathon platform designed to provide participants with a simple and structured experience for completing challenges and documenting their progress.

The platform combines authentication, challenge management, progress tracking, proof submission, and achievement tracking into a single dashboard.

---

## Problem Statement

Hackathon participants often need to manage multiple tasks, track their progress, and provide evidence of their completed work across different platforms.

JARVIS Vibecode addresses this by providing a centralized platform where users can:

- Sign in and access their workspace
- View and complete assigned challenges
- Track their progress
- Submit GitHub proof
- Submit LinkedIn proof
- View achievements and completion status

---

## Solution

JARVIS Vibecode provides a centralized and interactive dashboard that guides participants through the challenge journey.

The platform focuses on:

**Authentication → Challenges → Progress → Proof of Work → Achievements**

This creates a structured workflow from starting a challenge to submitting the required evidence.

---

##  Key Features

###  Authentication
- User login
- Email-based access
- Session persistence
- Logout functionality

###  Challenge Management
- Challenge/day-based workflow
- Challenge access through the dashboard
- Progress tracking
- Completion status

###  Progress Dashboard
- Centralized participant dashboard
- Progress indicators
- Achievement tracking
- Completion status

### Proof of Work
- GitHub repository/commit submission
- LinkedIn post submission
- Evidence tracking

### Achievements
- Track completed activities
- Display participant achievements
- Monitor challenge completion

### Responsive Interface
- Modern dark-themed interface
- Responsive layout
- Interactive components
- Clean user experience

---

## Tech Stack

Technology	       Purpose
React	            Frontend framework
TypeScript	      Type-safe development
Vite	            Development and build tool
Node.js	          Backend/runtime
JavaScript	      Application logic
HTML5	            Page structure
CSS	              Styling
Git & GitHub	    Version control

---

## Project Structure

```text
JARVIS_Vibecode/
│
├── api/
│   ├── challenges/
│   ├── day/
│   ├── proof/
│   ├── achievements.js
│   ├── auth.js
│   ├── dashboard.js
│   ├── progress.js
│   └── student.js
│
├── src/
│   ├── components/
│   ├── data/
│   └── ...
│
├── public/
│
├── index.html
├── package.json
├── package-lock.json
├── server.cjs
├── vite.config.ts
├── tsconfig.json
└── README.md
