from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, Column, Integer, String, text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy.exc import SQLAlchemyError
from pydantic import BaseModel, ConfigDict
import os
from typing import List, Optional
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Dummy Backend API")

# Setup PostgreSQL connection engine
# Connecting via localhost since we mapped the port with -p 5432:5432
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:mysecretpassword@localhost:5432/postgres")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# --- Database Models ---
class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(String, index=True, nullable=True)
    price = Column(Integer)

# Create tables
Base.metadata.create_all(bind=engine)

# --- Pydantic Schemas ---
class ProductCreate(BaseModel):
    name: str
    description: Optional[str] = None
    price: int

class ProductResponse(BaseModel):
    id: int
    name: str
    description: Optional[str] = None
    price: int
    
    model_config = ConfigDict(from_attributes=True)

# --- Dependencies ---
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Allow requests from the Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Hello from FastAPI Backend!"}

@app.post("/api/products", response_model=ProductResponse)
def create_product(product: ProductCreate, db: Session = Depends(get_db)):
    db_product = Product(**product.model_dump())
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product

@app.get("/api/products", response_model=List[ProductResponse])
def get_products(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    products = db.query(Product).offset(skip).limit(limit).all()
    return products

@app.get("/api/db-test")
def test_db_connection():
    try:
        with engine.connect() as connection:
            result = connection.execute(text("SELECT version();"))
            version = result.scalar()
            return {"status": "success", "message": "Successfully connected to the database!", "db_version": version}
    except SQLAlchemyError as e:
        raise HTTPException(status_code=500, detail=f"Database connection failed: {str(e)}")
