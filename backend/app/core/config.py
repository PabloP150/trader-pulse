from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import Field

class Settings(BaseSettings):
    port: int = Field(default=8000, alias="PORT")
    environment: str = Field(default="development", alias="ENVIRONMENT")
    frontend_url: str = Field(default="http://localhost:3000", alias="FRONTEND_URL")
    gemini_api_key: str = Field(..., alias="GEMINI_API_KEY")
    
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore"
    )

settings = Settings()
