from sqlalchemy import create_engine

DATABASE_URL = "postgresql://postgres:postgres@localhost:5432/organ_donation"
engine = create_engine(DATABASE_URL)

try:
    with engine.connect() as conn:
        print("Database connection successful!")
except Exception as e:
    print(f"Database connection failed: {e}")
