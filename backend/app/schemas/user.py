from pydantic import BaseModel, ConfigDict
from typing import Optional

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

class TokenResponse(BaseModel):
    access_token: str
    token_type: str
    user: UserResponse
