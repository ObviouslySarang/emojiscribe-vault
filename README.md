

```
# 📒 Emojiscribe Vault — Secure Emo

> 🔐 Enterprise-grade Password Manager with Emoji-Based Encryption  
> Built using the MERN stack and TypeScript, with E2E encryption and enterprise security standards.

---

# 🚀 Project Overview

**Secure Emo** is a zero-knowledge password manager featuring client-side encryption, custom emoji-based visualization, and a secure backend using modern best practices. The system is modular, tested, and production-ready with CI/CD pipelines and a beautiful ShadCN UI.

---

# ⚙️ Tech Stack

### Frontend
- React + TypeScript + Vite
- TailwindCSS + ShadCN UI
- Axios + React Query

### Backend
- Node.js + Express + TypeScript (strict)
- Zod (validation) + Mongoose (MongoDB)

### Security
- JWT Auth (short-lived) + Refresh Tokens (HttpOnly, Secure)
- Bcrypt for password hashing
- AES-256-GCM encryption
- PBKDF2 or Argon2 for key derivation
- Emoji-based password visualization
- Helmet, CSRF, rate limiting, brute force protection

### Testing
- Jest + ts-jest (backend unit tests)
- Supertest (integration tests)
- Vitest + React Testing Library (frontend tests)
- MSW (mock API for UI testing)

---

## ✨ Features

- 🔐 End-to-end encryption with emoji cipher visualization
- 🧠 Client-side password encryption
- 📂 Vault management: add, update, delete, list
- 🔍 Search, filter, sort vault entries
- 🌙 Dark/light theme toggle
- 📋 Copy to clipboard with auto-clear
- ⚙️ Fully tested backend and frontend
- 🔁 CI/CD with GitHub Actions
- 🌐 Deployed frontend (Netlify) & backend (Railway/Render)

---

## 📁 Folder Structure

```

emojiscribe-vault/
├── frontend/                # React app (Vite)
│   ├── src/components/
│   ├── src/pages/
│   ├── src/hooks/
│   └── ...
├── backend/                 # Node + Express API
│   ├── src/routes/
│   ├── src/controllers/
│   ├── src/middleware/
│   └── ...
├── shared/                 # Shared utilities (encryption, types)
├── .github/workflows/      # CI/CD pipelines

````

---

## 🔐 Security Model

- **End-to-End Encryption:** Passwords encrypted client-side before transmission.
- **Encryption:** AES-256-GCM with PBKDF2/Argon2-based key derivation.
- **Emoji Layer:** Custom mapping on top of real encryption for user visualization.
- **Authentication:** JWT + Refresh Tokens via HttpOnly, Secure cookies.
- **Best Practices:** Helmet, rate limiting, CSRF protection, no plain-text secrets.

---

## 🧪 Testing Strategy

### Backend
- Encryption utilities tested with Jest
- API endpoints tested with Supertest

### Frontend
- Component/unit tests with Vitest
- API mocking using MSW

---

## 🚀 Setup Instructions

### Prerequisites

- Node.js v18+
- pnpm v8+
- MongoDB Atlas
- Netlify + Railway/Render accounts

### Clone & Install

```bash
git clone https://github.com/ObviouslySarang/emojiscribe-vault.git
cd emojiscribe-vault
pnpm install
````

### Environment Variables

Create `.env` files in `frontend` and `backend`.

**backend/.env**

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=supersecurejwt
JWT_REFRESH_SECRET=supersecurejwtrefresh
CLIENT_URL=http://localhost:3000
```

**frontend/.env**

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### Run Dev Servers

```bash
# Start backend
cd backend
pnpm dev

# Start frontend
cd frontend
pnpm dev
```

---

## 🔁 CI/CD Configuration

* GitHub Actions for linting, testing, and building on every push
* Auto-deploy:

  * Netlify (frontend)
  * Railway/Render (backend)
* Store secrets in GitHub → Settings → Secrets

---

## 🌍 Deployment

### Frontend → Netlify

* Build Command: `pnpm build`
* Output Directory: `dist/`
* Set env vars in dashboard

### Backend → Railway/Render

* Deploy from GitHub repo
* Set environment variables
* Enforce HTTPS and secure cookies

### Database → MongoDB Atlas

* Create cluster
* Add IP + user
* Paste connection string into `.env`

---

## 🤝 Contributing

1. Fork the repo
2. Create a new branch: `git checkout -b feat/feature-name`
3. Commit your changes
4. Push and open a PR 🚀

---

## 📄 License

Licensed under the **MIT License**.

---

## 📬 Contact

Questions or suggestions?
Open an issue or PR at [https://github.com/ObviouslySarang/emojiscribe-vault](https://github.com/ObviouslySarang/emojiscribe-vault).

```

---

Would you like me to generate this into a file (`README.md`) or help you format it directly in your repository using GitHub UI?
```
