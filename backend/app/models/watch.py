from sqlalchemy import Column, Integer, String, Float
from app.database import Base

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
