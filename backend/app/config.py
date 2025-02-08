from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    DATABASE_URL: str = "postgresql://username:password@localhost:5432/organ_donation"
    SECRET_KEY: str = "your-secret-key"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    GEMINI_API_KEY: str = "your-gemini-api-key"

    model_config = SettingsConfigDict(
        env_file=".env",
        extra="allow"
    )

# Ensure the model is fully built
Settings.model_rebuild()

# Now create an instance
settings = Settings()
