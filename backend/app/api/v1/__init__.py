from fastapi import APIRouter
from app.api.v1 import products, auth, watches, admin

api_router = APIRouter()

# Include all route modules
api_router.include_router(products.router, prefix="/products", tags=["products"])
api_router.include_router(auth.router, prefix="/auth", tags=["authentication"])
api_router.include_router(watches.router, prefix="/watches", tags=["watches"])
api_router.include_router(admin.router, prefix="/admin", tags=["admin"])
