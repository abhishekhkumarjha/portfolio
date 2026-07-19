# A. K. Portfolio

Interactive 3D portfolio for Abhishekh Kumar Jha, built with React, Vite, Three.js, and an Express backend.

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   `npm install`
2. Add runtime settings in `.env.local`.
3. Run the full application:
   `npm run dev`

`npm run dev` starts the Vite frontend at `http://localhost:3000` and the Express backend at `http://localhost:3001`.

## Backend API

- `GET /api/health` checks that the backend is running.
- `POST /api/contact` mails contact form submissions to the configured recipient and stores a local copy in `server/data/messages.json`.
- `GET /api/messages` returns saved messages. Set `ADMIN_TOKEN` in `.env.local` and send it as the `x-admin-token` header.

## Production Run

1. Configure environment variables:
   `NODE_ENV=production`
   `PORT=3001`
   `ADMIN_TOKEN=<strong-admin-token>`
   `CONTACT_TO=<recipient-email>`
   `SMTP_HOST=<smtp-host>`
   `SMTP_PORT=587`
   `SMTP_SECURE=false`
   `SMTP_USER=<smtp-user>`
   `SMTP_PASS=<smtp-password-or-app-password>`
   `SMTP_FROM="A. K. Portfolio <smtp-user>"`
2. Build the frontend and backend:
   `npm run build`
3. Start the Express server:
   `npm start`

The production start command runs `node dist/server/index.js` and serves the built Vite app from `dist`.

## Deploy: Render Backend + Vercel Frontend

### Render backend

Create a Render Web Service from this repository.

- Build command: `npm ci && npm run build:server`
- Start command: `node dist/server/index.js`
- Health check path: `/api/health`

Set these Render environment variables:

```env
NODE_ENV=production
ADMIN_TOKEN=<strong-admin-token>
CONTACT_TO=<recipient-email>
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=<smtp-user>
SMTP_PASS=<smtp-password-or-app-password>
SMTP_FROM=A. K. Portfolio <smtp-user>
```

Render provides `PORT` automatically.

### Vercel frontend

Create a Vercel project from this repository.

- Framework preset: Vite
- Build command: `npm run build:client`
- Output directory: `dist`
- Install command: `npm ci`

The current frontend is static. If you add frontend API calls later, route them through `/api/...` and update `vercel.json` with the deployed Render backend URL.
