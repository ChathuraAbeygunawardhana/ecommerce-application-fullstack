from pydantic import BaseModel, ConfigDict
from typing import Optional

class ProductCreate(BaseModel):
    name: str
    description: Optional[str] = None
    price: int

class ProductUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[int] = None

class ProductResponse(BaseModel):
    id: int
    name: str
    description: Optional[str] = None
    price: int
    
    model_config = ConfigDict(from_attributes=True)
