from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, Column, Integer, String, Boolean, Float, text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy.exc import SQLAlchemyError
from pydantic import BaseModel, ConfigDict
import os
from typing import List, Optional
from dotenv import load_dotenv
import math

load_dotenv()

app = FastAPI(title="Watch Collection API")

# Setup PostgreSQL connection engine
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

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String, index=True, nullable=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)
    role = Column(String, default="customer")

class Watch(Base):
    __tablename__ = "watches"

    id = Column(Integer, primary_key=True, index=True)
    make_name = Column(String, index=True)
    model_name = Column(String, index=True)
    family_name = Column(String, nullable=True)
    year_produced = Column(String, nullable=True)
    reference = Column(String, nullable=True)
    movement_name = Column(String, nullable=True)
    case_material = Column(String, nullable=True)
    case_diameter = Column(String, nullable=True)
    dial_color = Column(String, nullable=True)
    price_euro = Column(Float, nullable=True)
    description = Column(String, nullable=True)
    image_url = Column(String, nullable=True)
    functions = Column(String, nullable=True)  # Comma-separated
    limited_edition = Column(String, nullable=True)
    water_resistance = Column(String, nullable=True)

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

class UserCreate(BaseModel):
    name: Optional[str] = None
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class UserResponse(BaseModel):
    id: int
    full_name: Optional[str] = None
    email: str
    role: Optional[str] = None
    
    model_config = ConfigDict(from_attributes=True)

class WatchResponse(BaseModel):
    id: int
    make_name: str
    model_name: str
    family_name: Optional[str] = None
    year_produced: Optional[str] = None
    reference: Optional[str] = None
    movement_name: Optional[str] = None
    case_material: Optional[str] = None
    case_diameter: Optional[str] = None
    dial_color: Optional[str] = None
    price_euro: Optional[float] = None
    description: Optional[str] = None
    image_url: Optional[str] = None
    functions: Optional[str] = None
    limited_edition: Optional[str] = None
    water_resistance: Optional[str] = None
    
    model_config = ConfigDict(from_attributes=True)

class WatchesListResponse(BaseModel):
    count: int
    page: int
    total_pages: int
    limit: int
    watches: List[WatchResponse]

class MakeResponse(BaseModel):
    make_id: int
    make_name: str
    count: int

class ModelResponse(BaseModel):
    model_id: int
    model_name: str
    make_name: str
    count: int

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

@app.post("/api/auth/sign-up", response_model=UserResponse)
def sign_up(user: UserCreate, db: Session = Depends(get_db)):
    # Check if user already exists
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    new_user = User(full_name=user.name, email=user.email, hashed_password=user.password, role="customer", is_active=True)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@app.post("/api/auth/sign-in")
def sign_in(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if not db_user or db_user.hashed_password != user.password:
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    # In a real app, return a JWT token here
    return {"message": "Login successful", "user": {"id": db_user.id, "name": db_user.full_name, "email": db_user.email, "role": db_user.role}}

@app.get("/api/db-test")
def test_db_connection():
    try:
        with engine.connect() as connection:
            result = connection.execute(text("SELECT version();"))
            version = result.scalar()
            return {"status": "success", "message": "Successfully connected to the database!", "db_version": version}
    except SQLAlchemyError as e:
        raise HTTPException(status_code=500, detail=f"Database connection failed: {str(e)}")

# --- Watch Endpoints ---
# IMPORTANT: More specific routes must come before parameterized routes
@app.get("/api/watches/makes")
def get_makes(db: Session = Depends(get_db)):
    """Get all unique watch makes with count"""
    from sqlalchemy import func
    
    makes = db.query(
        Watch.make_name,
        func.count(Watch.id).label('count')
    ).group_by(Watch.make_name).order_by(Watch.make_name).all()
    
    return {
        "count": len(makes),
        "makes": [
            {"make_id": idx + 1, "make_name": make[0], "count": make[1]}
            for idx, make in enumerate(makes)
        ]
    }

@app.get("/api/watches/models")
def get_models(make: Optional[str] = None, db: Session = Depends(get_db)):
    """Get all unique watch models, optionally filtered by make"""
    from sqlalchemy import func
    
    query = db.query(
        Watch.model_name,
        Watch.make_name,
        func.count(Watch.id).label('count')
    )
    
    if make:
        query = query.filter(Watch.make_name.ilike(f"%{make}%"))
    
    models = query.group_by(Watch.model_name, Watch.make_name).order_by(Watch.model_name).all()
    
    return {
        "count": len(models),
        "models": [
            {
                "model_id": idx + 1,
                "model_name": model[0],
                "make_name": model[1],
                "count": model[2]
            }
            for idx, model in enumerate(models)
        ]
    }

@app.get("/api/watches", response_model=WatchesListResponse)
def get_watches(
    page: int = 1,
    limit: int = 20,
    make: Optional[str] = None,
    model: Optional[str] = None,
    search: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """Get paginated list of watches with optional filters"""
    query = db.query(Watch)
    
    # Apply filters
    if make:
        query = query.filter(Watch.make_name.ilike(f"%{make}%"))
    if model:
        query = query.filter(Watch.model_name.ilike(f"%{model}%"))
    if search:
        query = query.filter(
            (Watch.make_name.ilike(f"%{search}%")) |
            (Watch.model_name.ilike(f"%{search}%")) |
            (Watch.reference.ilike(f"%{search}%"))
        )
    
    # Get total count
    total_count = query.count()
    total_pages = math.ceil(total_count / limit)
    
    # Apply pagination
    watches = query.offset((page - 1) * limit).limit(limit).all()
    
    return WatchesListResponse(
        count=total_count,
        page=page,
        total_pages=total_pages,
        limit=limit,
        watches=watches
    )

@app.get("/api/watches/{watch_id}", response_model=WatchResponse)
def get_watch_details(watch_id: int, db: Session = Depends(get_db)):
    """Get detailed information about a specific watch"""
    watch = db.query(Watch).filter(Watch.id == watch_id).first()
    if not watch:
        raise HTTPException(status_code=404, detail="Watch not found")
    return watch
