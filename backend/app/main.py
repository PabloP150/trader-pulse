from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import market, sentiment, gamification
from app.core.config import settings

app = FastAPI(
    title="TraderPulse API",
    description="Backend for TraderPulse SaaS Dashboard",
    version="1.0.0"
)

origins = [settings.frontend_url.rstrip("/")]
if settings.environment == "development":
    origins.extend(["http://localhost:3000", "http://127.0.0.1:3000", "http://localhost:3001", "http://127.0.0.1:3001"])

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(market.router, prefix="/api/v1/stocks", tags=["Stocks"])
app.include_router(sentiment.router, prefix="/api/v1/sentiment", tags=["AI Sentiment"])
app.include_router(gamification.router, prefix="/api/v1/gamification", tags=["Gamification"])

@app.get("/health")
def health_check():
    return {"status": "ok", "version": app.version}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=settings.port, reload=(settings.environment == "development"))
