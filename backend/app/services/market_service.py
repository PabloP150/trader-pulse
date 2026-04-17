import yfinance as yf
from fastapi import HTTPException

def get_stock_quote(symbol: str) -> dict:
    try:
        ticker = yf.Ticker(symbol)
        
        history = ticker.history(period="1mo")
        if history.empty:
            raise HTTPException(status_code=404, detail=f"Stock symbol {symbol.upper()} not found.")
        
        # Purge missing entries avoiding Recharts line dropping abruptly
        history = history.dropna(subset=['Close'])
        
        last_price = float(history['Close'].iloc[-1])
        prev_close = float(history['Close'].iloc[-2]) if len(history) > 1 else float(history['Open'].iloc[0])
        
        change = last_price - prev_close
        change_percent = (change / prev_close) * 100 if prev_close else 0.0
        
        chart_history = []
        for index, row in history.iterrows():
            date_str = index.strftime("%m/%d/%Y")
            chart_history.append({"time": date_str, "price": float(round(row['Close'], 2))})

        return {
            "symbol": symbol.upper(),
            "lastPrice": round(last_price, 2),
            "change": round(change, 2),
            "changePercent": round(change_percent, 2),
            "volume": int(history['Volume'].iloc[-1]),
            "history": chart_history
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"Failed to fetch data for {symbol.upper()}: {str(e)}")
