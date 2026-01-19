## Devvit React Starter

A starter to build web applications on Reddit's developer platform

- [Devvit](https://developers.reddit.com/): A way to build and deploy immersive games on Reddit
- [Vite](https://vite.dev/): For compiling the webView
- [React](https://react.dev/): For UI
- [Express](https://expressjs.com/): For backend logic
- [Tailwind](https://tailwindcss.com/): For styles
- [Typescript](https://www.typescriptlang.org/): For type safety

## Getting Started

> Make sure you have Node 22 downloaded on your machine before running!

1. Run `npm create devvit@latest --template=react`
2. Go through the installation wizard. You will need to create a Reddit account and connect it to Reddit developers
3. Copy the command on the success page into your terminal

## Commands

- `npm run dev`: Starts a development server where you can develop your application live on Reddit.
- `npm run build`: Builds your client and server projects
- `npm run deploy`: Uploads a new version of your app
- `npm run launch`: Publishes your app for review
- `npm run login`: Logs your CLI into Reddit
- `npm run check`: Type checks, lints, and prettifies your app

## Cursor Integration

This template comes with a pre-configured cursor environment. To get started, [download cursor](https://www.cursor.com/downloads) and enable the `devvit-mcp` when prompted.

---
                         
# ✨ The One-Word Story ✍️

> *A collaborative multiplayer game built for the Reddit Developer Platform Hackathon.*

## About This Project
This project represents a major milestone in my journey as a developer. It is **my first-ever Full Stack application**, built completely from scratch during the **Reddit Developer Platform Hackathon (2026)**.

While I am currently pursuing post-graduate studies, this project was built entirely independently of my coursework. I undertook this challenge as a self-directed "sprint" to learn modern web development, backend logic, and database management in a live environment.

## How It Works
The concept is simple but technically complex:
* **The Game:** Users on Reddit collaborate to write a single, continuous story.
* **The Rules:** Each user can contribute exactly one word at a time.
* **The Twist:** The app tracks the history of every single word, permanently recording which user added what.

## Tech Stack & Tools Learned
Since this was my first dive into Full Stack, I learned and implemented the following technologies:

* **Frontend:** React (Hooks, State Management), TypeScript, CSS modules.
* **Backend:** Node.js environment, RESTful APIs.
* **Database:** Redis (Key-Value store for persistent game state).
* **Platform:** Devvit (Reddit's Developer Toolkit).
* **Version Control:** Git & GitHub.

## Key Features
* **Real-Time State:** The story updates instantly for users.
* **History Tracking:** A dynamic list that renders the username next to their specific word contribution.
* **Validation Logic:** Backend checks to prevent spam, sentence fragments, or "system" messages from clogging the history.
* **Security:** Implemented on a private testing subreddit with full moderation controls.

## What I Learned
Building this project taught me the complete software lifecycle:
1.  **Connecting Frontend to Backend:** Understanding how `fetch` requests send data to API endpoints.
2.  **State Management:** Using `useState` and `useEffect` to handle asynchronous data.
3.  **Debugging:** Troubleshooting build errors and deployment issues in a terminal environment.
4.  **Deployment:** Pushing a live application to production servers.

---
*Built with ❤️ by [Panic-At-The-Distro]*
