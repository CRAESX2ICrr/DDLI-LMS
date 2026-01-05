This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Quizzily 

Quizzily is a web-based learning assessment platform built with **Next.js (App Router)**.  
It provides a structured learning flow with **Pre-Test - Video - Post-Test**, user authentication, and persistent progress using local storage.

---

## LOGIN Credentials

Username: Clayton
Password: 12345678
Role: USER

Username: adminer
Password: admin1234
Role: Admin

## Live Application

 **Hosted Application (Vercel):**  
https://ddli-lms.vercel.app/

---

## Source Code

 **GitHub Repository:**  
https://github.com/CRAESX2ICrr/DDLI-LMS

---

## Tech Stack

- **Next.js (App Router)**
- **React**
- **Tailwind CSS**
- **JavaScript**
- **Vercel** (Hosting)
- **Local Storage** (State persistence)

## Features
Role-based login (User/Admin) with a built-in role toggle and credential validation
Global auth + app state managed via React Context (user, role, step, scores, video completion)
Persistent session/app progress using localStorage (restores on refresh/reload)
Structured learning flow for Users: Pre-Test → Video → Post-Test
Pre-Test and Post-Test quiz engine:
        Randomly shuffles question bank and selects 3 questions per attempt
        Single-choice answers, next/submit flow, score calculation, completion screens
        Per-test progress persistence (stores current question, answers, submitted state, score)
Video learning module (Vimeo):
        Embedded Vimeo player with custom controls (play/pause, restart, seek back)
        Progress tracking + resume playback from last watched timestamp
        Gated progression: “Continue to Post-Test” unlocks only after the video ends
Admin panel: Question editor (client-side)
        Create, update, delete questions
        Edit options and set the correct answer via radio selection
        Pagination for the question list
        Persists the edited question list in localStorage


---



