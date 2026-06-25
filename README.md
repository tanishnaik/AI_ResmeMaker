# AI_ResmeMaker

AI-powered resume builder with a React/Vite frontend and Express/MongoDB backend.

## Project Structure

- `frontend/` - React app for resume editing, templates, preview/export, cover letters, auth, and dashboard.
- `backend/` - Express API with MongoDB models for users, resumes, products, orders, and app state.

## Run Locally

Install dependencies:

```bash
npm install
cd frontend && npm install
cd ../backend && npm install
```

Start backend:

```bash
cd backend
npm.cmd run dev
```

Start frontend:

```bash
cd frontend
npm.cmd run dev
```

Create `backend/.env` locally with:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
CLIENT_ORIGIN=http://localhost:5175
JWT_SECRET=change-this-dev-secret
```
