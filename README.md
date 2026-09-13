# StayNest

StayNest is an Airbnb-inspired property rental platform built as a TypeScript MERN monorepo. The first phase includes a responsive discovery experience and a production-oriented API foundation; domain modules are designed to grow behind `/api/v1`.

## Stack

- Client: React, TypeScript, Vite
- API: Node.js, Express, TypeScript
- Data: MongoDB and Mongoose (connection/model layer follows in Phase 2)
- Operations: Docker Compose, GitHub Actions

## Structure

```text
client/       React application and responsive discovery UI
server/       Express API, security middleware, and health endpoint
shared/       Shared TypeScript contracts
docs/         Architecture and deployment notes
.github/      CI workflows
```

## Local development

```bash
npm install
Copy-Item server/.env.example server/.env
npm run dev
```

The client runs at `http://localhost:5173` and the API health endpoint is available at `http://localhost:4000/api/v1/health`.

## Verification

```bash
npm run typecheck
npm run lint
npm run build
```

## Environment

Private backend values belong in `server/.env`. The browser may only receive variables prefixed with `VITE_`; never put database credentials, JWT secrets, or Cloudinary secrets in client variables.

## Roadmap

Authentication, Mongoose models, listings, search, booking conflict prevention, favorites, reviews, host/admin workflows, Cloudinary uploads, API tests, and deployment-specific configuration will be added in subsequent phases.
