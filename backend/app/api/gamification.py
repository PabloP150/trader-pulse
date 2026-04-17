from fastapi import APIRouter

router = APIRouter()

@router.get("/status")
def get_status():
    return {
        "level": "Inversionista Avanzado",
        "points": 4550,
        "next_level_points": 5000,
        "badges": ["Bull Market Survivor", "Early Adopter"]
    }
