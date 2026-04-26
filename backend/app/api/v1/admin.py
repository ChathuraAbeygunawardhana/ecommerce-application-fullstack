from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List

from app.api.deps import get_db, get_current_admin
from app.models.user import User
from app.models.product import Product
from app.models.watch import Watch
from app.schemas.user import UserResponse

router = APIRouter()

@router.get("/analytics")
def get_analytics(
    db: Session = Depends(get_db),
    admin = Depends(get_current_admin)
):
    """Get analytics dashboard data (Admin only)"""
    
    # Count total users by role
    total_users = db.query(func.count(User.id)).scalar()
    total_customers = db.query(func.count(User.id)).filter(User.role == "customer").scalar()
    total_admins = db.query(func.count(User.id)).filter(User.role == "admin").scalar()
    
    # Count products and watches
    total_products = db.query(func.count(Product.id)).scalar()
    total_watches = db.query(func.count(Watch.id)).scalar()
    
    # Get recent customers
    recent_customers = db.query(User).filter(User.role == "customer").order_by(User.id.desc()).limit(10).all()
    
    return {
        "users": {
            "total": total_users,
            "customers": total_customers,
            "admins": total_admins
        },
        "products": {
            "total": total_products
        },
        "watches": {
            "total": total_watches
        },
        "recent_customers": [
            {
                "id": user.id,
                "full_name": user.full_name,
                "email": user.email,
                "is_active": user.is_active
            }
            for user in recent_customers
        ]
    }

@router.get("/users", response_model=List[UserResponse])
def get_all_users(
    skip: int = 0,
    limit: int = 50,
    db: Session = Depends(get_db),
    admin = Depends(get_current_admin)
):
    """Get all users (Admin only)"""
    users = db.query(User).offset(skip).limit(limit).all()
    return users

@router.get("/customers", response_model=List[UserResponse])
def get_customers(
    skip: int = 0,
    limit: int = 50,
    db: Session = Depends(get_db),
    admin = Depends(get_current_admin)
):
    """Get all customers (Admin only)"""
    customers = db.query(User).filter(User.role == "customer").offset(skip).limit(limit).all()
    return customers
