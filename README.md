# Onboardly — Employee Onboarding Management System
Full-stack starter: React + Vite + Tailwind CSS + Express + MongoDB.

## Requirements
- Node.js 18+
- MongoDB Community Server or MongoDB Atlas

## Run backend
```bash
cd backend
cp .env.example .env
# Edit MONGO_URI and JWT_SECRET
npm install
npm run seed:admin
npm run dev
```
API: http://localhost:5000/api
Demo admin: `admin@onboardly.local` / `Admin@12345` (local development only; change it before deployment).

## Run frontend (new terminal)
```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```
Vite prints the local URL, usually http://localhost:5173.

## MongoDB Compass
Local connection: `mongodb://127.0.0.1:27017/onboardly`

## Deploy on Vercel
The root `vercel.json` configures the `backend` Express service and `frontend` Vite service. Requests under `/api` are routed to the backend; all other paths are routed to the frontend. The frontend uses `/api` by default, so no frontend API URL is needed for the shared Vercel domain. Set `MONGO_URI` to a hosted MongoDB connection string and `JWT_SECRET` to a strong secret in the Vercel project environment before deploying.

Uploaded documents currently use local disk storage. Vercel function filesystems are ephemeral, so uploads need persistent external object storage for production use.

## Included
- Role-based JWT login (Admin/Employee)
- Employee registration and admin employee management
- Document upload, review, approval and rejection reasons
- Onboarding checklist and progress
- Notifications, departments, reports and charts
- Responsive animated UI

This is a college-project starter, not production-certified HR software. Before public deployment, add rate limiting, email verification/password reset, security review, malware scanning, audit logs, secure cookie sessions, and stronger file access controls. Backend routes enforce roles; frontend guards are not a security boundary.
