from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import Optional
import math

from app.api.deps import get_db, get_current_admin
from app.models.watch import Watch
from app.schemas.watch import WatchResponse, WatchesListResponse, WatchCreate, WatchUpdate
from app.config import settings

router = APIRouter()

@router.get("/makes")
def get_makes(db: Session = Depends(get_db)):
    """Get all unique watch makes with count"""
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

@router.get("/models")
def get_models(make: Optional[str] = None, db: Session = Depends(get_db)):
    """Get all unique watch models, optionally filtered by make"""
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

@router.get("", response_model=WatchesListResponse)
def get_watches(
    page: int = 1,
    limit: int = settings.DEFAULT_PAGE_SIZE,
    make: Optional[str] = None,
    model: Optional[str] = None,
    search: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """Get paginated list of watches with optional filters"""
    # Validate and cap limit
    limit = min(limit, settings.MAX_PAGE_SIZE)
    
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

@router.get("/{watch_id}", response_model=WatchResponse)
def get_watch_details(watch_id: int, db: Session = Depends(get_db)):
    """Get detailed information about a specific watch"""
    watch = db.query(Watch).filter(Watch.id == watch_id).first()
    if not watch:
        raise HTTPException(status_code=404, detail="Watch not found")
    return watch

@router.post("", response_model=WatchResponse)
def create_watch(
    watch: WatchCreate,
    db: Session = Depends(get_db),
    admin = Depends(get_current_admin)
):
    """Create a new watch (Admin only)"""
    db_watch = Watch(**watch.model_dump())
    db.add(db_watch)
    db.commit()
    db.refresh(db_watch)
    return db_watch

@router.put("/{watch_id}", response_model=WatchResponse)
def update_watch(
    watch_id: int,
    watch: WatchUpdate,
    db: Session = Depends(get_db),
    admin = Depends(get_current_admin)
):
    """Update a watch (Admin only)"""
    db_watch = db.query(Watch).filter(Watch.id == watch_id).first()
    if not db_watch:
        raise HTTPException(status_code=404, detail="Watch not found")
    
    update_data = watch.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_watch, field, value)
    
    db.commit()
    db.refresh(db_watch)
    return db_watch

@router.delete("/{watch_id}")
def delete_watch(
    watch_id: int,
    db: Session = Depends(get_db),
    admin = Depends(get_current_admin)
):
    """Delete a watch (Admin only)"""
    db_watch = db.query(Watch).filter(Watch.id == watch_id).first()
    if not db_watch:
        raise HTTPException(status_code=404, detail="Watch not found")
    
    db.delete(db_watch)
    db.commit()
    return {"message": "Watch deleted successfully"}
