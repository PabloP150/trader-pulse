from fastapi import APIRouter
from app.services import market_service

router = APIRouter()

@router.get("/{symbol}")
def get_quote(symbol: str):
    return market_service.get_stock_quote(symbol)
