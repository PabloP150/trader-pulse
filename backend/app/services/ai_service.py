from google import genai
from app.core.config import settings
from fastapi import HTTPException
import json

client = genai.Client(api_key=settings.gemini_api_key)

def get_sentiment_analysis(symbol: str, recent_price: float, change_percent: float) -> dict:
    prompt = f"""
    You are an expert financial analyst. Analyze the stock symbol '{symbol}'. 
    Today its latest price is ${recent_price} with a change of {change_percent}%.
    
    Return a structured JSON with ONLY the following schema:
    {{
        "sentiment": "Bearish" | "Bullish" | "Neutral",
        "justification": "A single sentence concisely justifying the sentiment in Spanish. Start the sentence with a capital letter."
    }}
    Do not return markdown formatting, just the raw JSON string. Be brief and objective.
    """
    
    try:
        response = client.models.generate_content(
            model='gemini-3-flash-preview',
            contents=prompt,
        )
        
        raw_text = response.text.strip()
        if raw_text.startswith("```json"):
            raw_text = raw_text.replace("```json", "").replace("```", "").strip()
        elif raw_text.startswith("```"):
            raw_text = raw_text.replace("```", "").strip()
            
        data = json.loads(raw_text)
        
        if "sentiment" not in data or "justification" not in data:
            raise ValueError("Malformed AI Response")
            
        return data
        
    except Exception as e:
        print(f"GenAI Error: {str(e)}")
        # If the gemini-3.0-flash model name fails (as it might be an unreleased alias in certain SDK builds)
        # We attempt a fallback to an established flash model.
        try:
             response = client.models.generate_content(
                model='gemini-2.5-flash',
                contents=prompt,
            )
             raw_text = response.text.strip().replace("```json", "").replace("```", "").strip()
             return json.loads(raw_text)
        except Exception as fallbackError:
            raise HTTPException(status_code=500, detail="AI Service is currently unavailable for generating sentiment.")
