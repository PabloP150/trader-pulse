from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok", "version": "1.0.0"}

def test_gamification_mock():
    response = client.get("/api/v1/gamification/status")
    assert response.status_code == 200
    assert "points" in response.json()

def test_invalid_stock():
    response = client.get("/api/v1/stocks/UNKNOWN_INVALID_123")
    assert response.status_code == 404
