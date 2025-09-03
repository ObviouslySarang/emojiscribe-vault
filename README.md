📒 Emojiscribe Vault — Secure Emo

🔐 Enterprise-grade Password Manager with Emoji-Based Encryption
Built with the MERN stack and TypeScript, featuring end-to-end encryption, emoji mapping, and robust security.

<!-- Optional banner -->

🚀 Project Overview

Emojiscribe Vault (codename: Secure Emo) is a full-featured, enterprise-ready password manager built with modern web technologies and hardened security practices. It leverages a custom emoji-based encryption language, AES-256-GCM, and PBKDF2/Argon2 for zero-knowledge, client-side encryption.

Designed with modularity, testability, and performance in mind, this project follows a phased approach to development with CI/CD, unit/integration tests, and a beautiful UI using ShadCN + TailwindCSS.

⚙️ Tech Stack
🧠 Frontend

React
 + TypeScript (strict mode)

Vite
, TailwindCSS
, ShadCN UI

React Query
 + Axios

🛠 Backend

Node.js + Express + TypeScript (strict mode)

Zod
 for schema validation

Mongoose
 for MongoDB models

🔐 Security & Encryption

JWT + Refresh Token auth with secure, HttpOnly cookies

Bcrypt for hashing passwords

AES-256-GCM for encryption

PBKDF2 or Argon2 for key derivation

Emoji mapping for password visualization

Helmet, Rate Limiting, CSRF, Brute Force protection

✨ Features

🔐 End-to-end encrypted password storage

🔐 Custom emoji mapping (visual cipher)

🧠 Client-side encryption before transmission

🌐 REST API with strict schema validation

🔒 No plaintext sensitive data ever stored

💅 Polished UI with ShadCN + TailwindCSS

🔍 Search, filter, and categorize vault entries

🌗 Light/Dark mode toggle

📋 Copy to clipboard with auto-clear

🧪 Full unit and integration test coverage

🔁 CI/CD via GitHub Actions (Netlify + Railway)

🧱 Folder Structure
emojiscribe-vault/
├── frontend/                # React (Vite) App
│   ├── src/components/
│   ├── src/pages/
│   ├── src/hooks/
│   ├── src/utils/
│   └── ...
├── backend/                 # Node + Express API
│   ├── src/routes/
│   ├── src/controllers/
│   ├── src/middleware/
│   ├── src/utils/
│   └── ...
├── shared/                 # Shared logic (encryption, types)
├── .github/workflows/      # CI/CD
└── ...

🔐 Security Model

Zero Knowledge: All encryption happens client-side before data leaves the browser.

Encryption Stack:

AES-256-GCM for secure encryption

PBKDF2 or Argon2 for password-based key derivation

Unique IV per encryption

Emoji mapping is purely visual, layered on top of AES

Auth Security:

Short-lived JWT access tokens

Secure, HttpOnly refresh tokens

Bcrypt for password hashing

Transport Layer: HTTPS enforced (via Netlify + Railway)

Server Hardening: Helmet, rate limiter, CSRF protection, brute force lockout.

🧪 Testing
✅ Backend

Unit Tests: encryption, validation, utility functions (Jest)

Integration Tests: all endpoints using Supertest

✅ Frontend

Component Tests: Vitest + React Testing Library

Mocking: MSW (Mock Service Worker) for API mocks

🚀 Setup Instructions
🔧 Prerequisites

Node.js >= 18

pnpm >= 8

MongoDB Atlas (free tier)

Netlify + Railway/Render account (for deployment)

🛠️ Installation
git clone https://github.com/ObviouslySarang/emojiscribe-vault.git
cd emojiscribe-vault
pnpm install

🔑 Environment Variables

Create .env files in /frontend and /backend with the following:

Backend .env

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=supersecurejwt
JWT_REFRESH_SECRET=supersecurejwtrefresh
CLIENT_URL=http://localhost:3000


Frontend .env

VITE_API_BASE_URL=http://localhost:5000/api

🧪 Run Locally
# Start backend
cd backend
pnpm dev

# Start frontend
cd frontend
pnpm dev

🔁 CI/CD (GitHub Actions)

Auto lint/test/build on every push

Auto-deploy:

Frontend → Netlify

Backend → Railway/Render

Secrets stored securely via GitHub Actions

🌍 Deployment
Frontend (Netlify)

Connect repo, set build command: pnpm run build

Set output directory: dist/

Add environment variables in Netlify dashboard

Backend (Railway/Render)

Deploy backend directly from GitHub

Add .env values via dashboard

Enable HTTPS and environment protection

Database (MongoDB Atlas)

Create cluster

Add user, IP whitelist

Get connection string for .env

🤝 Contributing

We welcome contributions! Here’s how to get started:

Fork the repo

Create a feature branch (git checkout -b feat/your-feature)

Commit your changes

Run tests & linting

Open a pull request 🚀

📄 License

This project is licensed under the MIT License.

📬 Contact

Feel free to reach out via GitHub Issues
 for bugs or suggestions.
