# TraderPulse 🚀

A high-performance SaaS dashboard for real-time market analysis featuring a decoupled architecture. 

## 🌍 Live Environments
- **Frontend (SSR Next.js)**: [https://frontend-kappa-peach-68.vercel.app](https://frontend-kappa-peach-68.vercel.app)
- **Backend API (Cloud Run)**: [https://traderpulse-api-864261902897.us-central1.run.app/api/v1/health](https://traderpulse-api-864261902897.us-central1.run.app/api/v1/health)

## 🏗 Stack Overview
- **Frontend Integration**: Next.js 16 (App Router), Tailwind CSS, Recharts, SWR for optimized polling.
- **Backend Services**: FastAPI (Python 3.12), `yfinance` for real-time tick processing.
- **AI Analytics**: Gemini 3 Flash (`google-genai`) powered by Google Secret Manager.
- **DevOps**: Vercel Edge Serverless, Google Artifact Registry & Cloud Run deployments.

---
Please refer to the `docs/` folder for deep architectural guides (`ARCHITECTURE.md`) and deployment playbooks (`ONBOARDING.md`).
