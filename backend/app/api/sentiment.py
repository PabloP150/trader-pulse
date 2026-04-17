from fastapi import APIRouter
from app.services import ai_service, market_service

router = APIRouter()

@router.get("/{symbol}")
def get_sentiment(symbol: str):
    quote = market_service.get_stock_quote(symbol)
    
    return ai_service.get_sentiment_analysis(
        symbol=symbol.upper(),
        recent_price=quote["lastPrice"],
        change_percent=quote["changePercent"]
    )
