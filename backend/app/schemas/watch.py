from pydantic import BaseModel, ConfigDict
from typing import List, Optional

class WatchCreate(BaseModel):
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

class WatchUpdate(BaseModel):
    make_name: Optional[str] = None
    model_name: Optional[str] = None
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
