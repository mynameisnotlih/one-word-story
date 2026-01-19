# Copilot Instructions for AI Coding Agents

## Project Overview
This is a Devvit React application designed to run as a game on Reddit. It uses a monorepo structure with clear separation between client, server, and shared code. The app is built and deployed using Devvit tooling and integrates with Reddit's platform for authentication, data persistence, and post creation.

## Architecture & Key Patterns
- **Monorepo Structure**: 
  - `src/client/`: React webview (frontend)
  - `src/server/`: Express backend (API endpoints, Reddit/Redis integration)
  - `src/shared/`: Shared TypeScript types
- **Client-Server Communication**: 
  - All API endpoints must start with `/api/` (e.g., `/api/init`, `/api/submit-word`).
  - Client fetches data using `fetch` to these endpoints; do not use external APIs from the client.
- **Devvit Integration**: 
  - Server uses `@devvit/web/server` for Reddit and Redis operations.
  - Authentication and context are handled automatically by Devvit.
- **Type Safety**: 
  - Use type aliases (not interfaces) for shared types in `src/shared/types/api.ts`.
- **Build System**: 
  - Vite is used for both client and server builds.
  - TypeScript project references are set up for modular compilation.

## Developer Workflows
- **Development**: Run `npm run dev` for live development (hot reload, playtest on Reddit).
- **Build**: Use `npm run build` to build both client and server.
- **Deploy**: Use `npm run deploy` to upload a new version to Reddit.
- **Publish**: Use `npm run launch` to submit for Reddit review.
- **Quality Checks**: Use `npm run check` for type checking, linting, and formatting.

## Project-Specific Conventions
- **Splash Screen**: Always provide a visually engaging splash screen in `src/client/splash/splash.tsx` with a launch button.
- **Mobile-First**: Design UI for mobile screens; most users play on mobile.
- **Error Handling**: Show clear, actionable error messages to users. Validate all user input on both client and server.
- **Temporary Test Files**: Remove any test or debug files after use. Only keep permanent tests if explicitly requested.
- **Do Not Change App Name**: The app name in `devvit.json` and `package.json` must remain unchanged for deployment.
- **Do Not Modify devvit.json**: Only change Devvit config if explicitly requested.

## Integration Points & Limitations
- **Reddit Platform**: All authentication and user context are managed by Devvit; do not implement custom auth.
- **Redis**: Use `redis` from `@devvit/web/server` for data persistence.
- **No External Client Requests**: Client can only call its own server endpoints; server can make external requests if needed.
- **No Websockets/Streaming**: Only single request/response patterns are supported.
- **No Native Node Modules**: Do not use `fs`, `http`, `https`, or native dependencies.

## Example Patterns
- **Client API Call**:
  ```ts
  fetch('/api/init').then(res => res.json()).then(data => { /* ... */ });
  ```
- **Server Endpoint**:
  ```ts
  router.get('/api/init', async (_req, res) => { /* ... */ });
  ```
- **Shared Type**:
  ```ts
  export type InitResponse = { type: 'init'; postId: string; count: number; username: string; };
  ```

## Key Files & Directories
- `src/client/game/App.tsx`: Main game UI logic
- `src/server/index.ts`: Express server and API endpoints
- `src/shared/types/api.ts`: Shared API response types
- `devvit.json`: Devvit app configuration
- `.kiro/steering/structure.md`: Project structure reference
- `.kiro/steering/tech.md`: Technology stack reference

---

If any section is unclear or missing important project-specific details, please provide feedback to improve these instructions.