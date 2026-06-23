# weather_api_key = "d7bedf12f5494b98a275f31e14225f17"
# app/config.py

class Config:
    WEATHER_API_KEY = "e6ff2021a72a412186687229ddf92289"

# Optional: Development config (if needed in the future)
class DevelopmentConfig(Config):
    DEBUG = True

# Optional: Production config (if needed in the future)
class ProductionConfig(Config):
    DEBUG = False