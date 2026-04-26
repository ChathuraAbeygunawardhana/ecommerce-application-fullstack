"""
Seed script to populate the database with watch data using Cloudinary images
Run this script: python seed_watches.py
"""
import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from main import Watch, Base
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:mysecretpassword@localhost:5432/postgres")
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create tables
Base.metadata.create_all(bind=engine)

# Watch brands and their popular models
WATCH_DATA = [
    # Rolex
    {"make": "Rolex", "model": "Submariner", "family": "Professional", "movement": "Automatic", "case_material": "Stainless Steel", "case_diameter": "41mm", "dial_color": "Black", "functions": "Date, Rotating Bezel", "water_resistance": "300m"},
    {"make": "Rolex", "model": "Daytona", "family": "Professional", "movement": "Automatic Chronograph", "case_material": "Stainless Steel", "case_diameter": "40mm", "dial_color": "White", "functions": "Chronograph, Tachymeter", "water_resistance": "100m"},
    {"make": "Rolex", "model": "GMT-Master II", "family": "Professional", "movement": "Automatic", "case_material": "Stainless Steel", "case_diameter": "40mm", "dial_color": "Black", "functions": "GMT, Date", "water_resistance": "100m"},
    {"make": "Rolex", "model": "Datejust", "family": "Classic", "movement": "Automatic", "case_material": "Steel/Gold", "case_diameter": "36mm", "dial_color": "Champagne", "functions": "Date", "water_resistance": "100m"},
    {"make": "Rolex", "model": "Day-Date", "family": "Classic", "movement": "Automatic", "case_material": "Yellow Gold", "case_diameter": "40mm", "dial_color": "Green", "functions": "Day, Date", "water_resistance": "100m"},
    {"make": "Rolex", "model": "Explorer", "family": "Professional", "movement": "Automatic", "case_material": "Stainless Steel", "case_diameter": "39mm", "dial_color": "Black", "functions": "Time Only", "water_resistance": "100m"},
    {"make": "Rolex", "model": "Sea-Dweller", "family": "Professional", "movement": "Automatic", "case_material": "Stainless Steel", "case_diameter": "43mm", "dial_color": "Black", "functions": "Date, Helium Valve", "water_resistance": "1220m"},
    {"make": "Rolex", "model": "Yacht-Master", "family": "Professional", "movement": "Automatic", "case_material": "Rolesium", "case_diameter": "40mm", "dial_color": "Blue", "functions": "Date, Rotating Bezel", "water_resistance": "100m"},
    
    # Omega
    {"make": "Omega", "model": "Speedmaster", "family": "Moonwatch", "movement": "Manual Chronograph", "case_material": "Stainless Steel", "case_diameter": "42mm", "dial_color": "Black", "functions": "Chronograph, Tachymeter", "water_resistance": "50m"},
    {"make": "Omega", "model": "Seamaster", "family": "Diver 300M", "movement": "Automatic", "case_material": "Stainless Steel", "case_diameter": "42mm", "dial_color": "Blue", "functions": "Date, Helium Valve", "water_resistance": "300m"},
    {"make": "Omega", "model": "Constellation", "family": "Classic", "movement": "Automatic", "case_material": "Steel/Gold", "case_diameter": "39mm", "dial_color": "Silver", "functions": "Date", "water_resistance": "100m"},
    {"make": "Omega", "model": "De Ville", "family": "Prestige", "movement": "Automatic", "case_material": "Stainless Steel", "case_diameter": "39.5mm", "dial_color": "White", "functions": "Date", "water_resistance": "30m"},
    {"make": "Omega", "model": "Aqua Terra", "family": "Seamaster", "movement": "Automatic", "case_material": "Stainless Steel", "case_diameter": "41mm", "dial_color": "Blue", "functions": "Date", "water_resistance": "150m"},
    
    # Patek Philippe
    {"make": "Patek Philippe", "model": "Nautilus", "family": "Sport Elegance", "movement": "Automatic", "case_material": "Stainless Steel", "case_diameter": "40mm", "dial_color": "Blue", "functions": "Date", "water_resistance": "120m"},
    {"make": "Patek Philippe", "model": "Calatrava", "family": "Classic", "movement": "Manual", "case_material": "White Gold", "case_diameter": "39mm", "dial_color": "White", "functions": "Time Only", "water_resistance": "30m"},
    {"make": "Patek Philippe", "model": "Aquanaut", "family": "Sport Elegance", "movement": "Automatic", "case_material": "Stainless Steel", "case_diameter": "40mm", "dial_color": "Black", "functions": "Date", "water_resistance": "120m"},
    {"make": "Patek Philippe", "model": "Grand Complications", "family": "Complications", "movement": "Automatic", "case_material": "Rose Gold", "case_diameter": "41mm", "dial_color": "Black", "functions": "Perpetual Calendar, Chronograph, Moon Phase", "water_resistance": "30m"},
    
    # Audemars Piguet
    {"make": "Audemars Piguet", "model": "Royal Oak", "family": "Sport", "movement": "Automatic", "case_material": "Stainless Steel", "case_diameter": "41mm", "dial_color": "Blue", "functions": "Date", "water_resistance": "50m"},
    {"make": "Audemars Piguet", "model": "Royal Oak Offshore", "family": "Sport", "movement": "Automatic Chronograph", "case_material": "Stainless Steel", "case_diameter": "42mm", "dial_color": "Black", "functions": "Chronograph, Date", "water_resistance": "100m"},
    {"make": "Audemars Piguet", "model": "Code 11.59", "family": "Contemporary", "movement": "Automatic", "case_material": "Rose Gold", "case_diameter": "41mm", "dial_color": "Smoked Blue", "functions": "Date", "water_resistance": "30m"},
    
    # TAG Heuer
    {"make": "TAG Heuer", "model": "Carrera", "family": "Racing", "movement": "Automatic Chronograph", "case_material": "Stainless Steel", "case_diameter": "43mm", "dial_color": "Black", "functions": "Chronograph, Date", "water_resistance": "100m"},
    {"make": "TAG Heuer", "model": "Monaco", "family": "Racing", "movement": "Automatic Chronograph", "case_material": "Stainless Steel", "case_diameter": "39mm", "dial_color": "Blue", "functions": "Chronograph, Date", "water_resistance": "100m"},
    {"make": "TAG Heuer", "model": "Aquaracer", "family": "Diving", "movement": "Automatic", "case_material": "Stainless Steel", "case_diameter": "43mm", "dial_color": "Blue", "functions": "Date, Rotating Bezel", "water_resistance": "300m"},
    {"make": "TAG Heuer", "model": "Formula 1", "family": "Racing", "movement": "Quartz", "case_material": "Stainless Steel", "case_diameter": "43mm", "dial_color": "Red", "functions": "Chronograph, Date", "water_resistance": "200m"},
    
    # Breitling
    {"make": "Breitling", "model": "Navitimer", "family": "Aviation", "movement": "Automatic Chronograph", "case_material": "Stainless Steel", "case_diameter": "46mm", "dial_color": "Black", "functions": "Chronograph, Slide Rule", "water_resistance": "30m"},
    {"make": "Breitling", "model": "Superocean", "family": "Diving", "movement": "Automatic", "case_material": "Stainless Steel", "case_diameter": "44mm", "dial_color": "Blue", "functions": "Date, Rotating Bezel", "water_resistance": "1000m"},
    {"make": "Breitling", "model": "Chronomat", "family": "Sport", "movement": "Automatic Chronograph", "case_material": "Stainless Steel", "case_diameter": "42mm", "dial_color": "Silver", "functions": "Chronograph, Date", "water_resistance": "200m"},
    
    # IWC
    {"make": "IWC", "model": "Pilot's Watch", "family": "Aviation", "movement": "Automatic", "case_material": "Stainless Steel", "case_diameter": "43mm", "dial_color": "Black", "functions": "Date, Power Reserve", "water_resistance": "60m"},
    {"make": "IWC", "model": "Portugieser", "family": "Classic", "movement": "Automatic Chronograph", "case_material": "Stainless Steel", "case_diameter": "41mm", "dial_color": "Silver", "functions": "Chronograph, Date", "water_resistance": "30m"},
    {"make": "IWC", "model": "Aquatimer", "family": "Diving", "movement": "Automatic", "case_material": "Stainless Steel", "case_diameter": "44mm", "dial_color": "Black", "functions": "Date, Rotating Bezel", "water_resistance": "300m"},
    
    # Cartier
    {"make": "Cartier", "model": "Santos", "family": "Classic", "movement": "Automatic", "case_material": "Steel/Gold", "case_diameter": "39.8mm", "dial_color": "Silver", "functions": "Date", "water_resistance": "100m"},
    {"make": "Cartier", "model": "Tank", "family": "Classic", "movement": "Manual", "case_material": "Yellow Gold", "case_diameter": "33.7mm", "dial_color": "Silver", "functions": "Time Only", "water_resistance": "30m"},
    {"make": "Cartier", "model": "Ballon Bleu", "family": "Classic", "movement": "Automatic", "case_material": "Stainless Steel", "case_diameter": "42mm", "dial_color": "Silver", "functions": "Date", "water_resistance": "30m"},
    
    # Panerai
    {"make": "Panerai", "model": "Luminor", "family": "Classic", "movement": "Automatic", "case_material": "Stainless Steel", "case_diameter": "44mm", "dial_color": "Black", "functions": "Date, Small Seconds", "water_resistance": "300m"},
    {"make": "Panerai", "model": "Radiomir", "family": "Classic", "movement": "Manual", "case_material": "Stainless Steel", "case_diameter": "45mm", "dial_color": "Black", "functions": "Small Seconds", "water_resistance": "100m"},
    {"make": "Panerai", "model": "Submersible", "family": "Diving", "movement": "Automatic", "case_material": "Titanium", "case_diameter": "42mm", "dial_color": "Blue", "functions": "Date, Rotating Bezel", "water_resistance": "300m"},
    
    # Jaeger-LeCoultre
    {"make": "Jaeger-LeCoultre", "model": "Reverso", "family": "Classic", "movement": "Manual", "case_material": "Stainless Steel", "case_diameter": "42.9mm", "dial_color": "Silver", "functions": "Small Seconds", "water_resistance": "30m"},
    {"make": "Jaeger-LeCoultre", "model": "Master Control", "family": "Classic", "movement": "Automatic", "case_material": "Stainless Steel", "case_diameter": "40mm", "dial_color": "Silver", "functions": "Date", "water_resistance": "50m"},
    {"make": "Jaeger-LeCoultre", "model": "Polaris", "family": "Sport", "movement": "Automatic", "case_material": "Stainless Steel", "case_diameter": "42mm", "dial_color": "Blue", "functions": "Date", "water_resistance": "200m"},
    
    # Zenith
    {"make": "Zenith", "model": "El Primero", "family": "Chronograph", "movement": "Automatic Chronograph", "case_material": "Stainless Steel", "case_diameter": "42mm", "dial_color": "Tri-Color", "functions": "Chronograph, Date", "water_resistance": "100m"},
    {"make": "Zenith", "model": "Defy", "family": "Contemporary", "movement": "Automatic", "case_material": "Titanium", "case_diameter": "44mm", "dial_color": "Skeleton", "functions": "Date", "water_resistance": "100m"},
    
    # Tudor
    {"make": "Tudor", "model": "Black Bay", "family": "Heritage", "movement": "Automatic", "case_material": "Stainless Steel", "case_diameter": "41mm", "dial_color": "Black", "functions": "Date, Rotating Bezel", "water_resistance": "200m"},
    {"make": "Tudor", "model": "Pelagos", "family": "Diving", "movement": "Automatic", "case_material": "Titanium", "case_diameter": "42mm", "dial_color": "Blue", "functions": "Date, Helium Valve", "water_resistance": "500m"},
    {"make": "Tudor", "model": "Ranger", "family": "Heritage", "movement": "Automatic", "case_material": "Stainless Steel", "case_diameter": "39mm", "dial_color": "Black", "functions": "Time Only", "water_resistance": "150m"},
    
    # Seiko
    {"make": "Seiko", "model": "Prospex", "family": "Diving", "movement": "Automatic", "case_material": "Stainless Steel", "case_diameter": "42mm", "dial_color": "Black", "functions": "Date, Rotating Bezel", "water_resistance": "200m"},
    {"make": "Seiko", "model": "Presage", "family": "Dress", "movement": "Automatic", "case_material": "Stainless Steel", "case_diameter": "40.5mm", "dial_color": "Enamel White", "functions": "Date, Power Reserve", "water_resistance": "50m"},
    {"make": "Seiko", "model": "Grand Seiko", "family": "Luxury", "movement": "Spring Drive", "case_material": "Stainless Steel", "case_diameter": "40mm", "dial_color": "Snowflake", "functions": "Date, Power Reserve", "water_resistance": "100m"},
    
    # Longines
    {"make": "Longines", "model": "Master Collection", "family": "Classic", "movement": "Automatic", "case_material": "Stainless Steel", "case_diameter": "40mm", "dial_color": "Silver", "functions": "Date, Moon Phase", "water_resistance": "30m"},
    {"make": "Longines", "model": "HydroConquest", "family": "Diving", "movement": "Automatic", "case_material": "Stainless Steel", "case_diameter": "43mm", "dial_color": "Blue", "functions": "Date, Rotating Bezel", "water_resistance": "300m"},
    {"make": "Longines", "model": "Spirit", "family": "Aviation", "movement": "Automatic", "case_material": "Stainless Steel", "case_diameter": "42mm", "dial_color": "Black", "functions": "Date", "water_resistance": "100m"},
]

# Year ranges for variety
YEARS = ["2018", "2019", "2020", "2021", "2022", "2023", "2024"]

# Reference number patterns
def generate_reference(make, model, index):
    prefixes = {
        "Rolex": "126",
        "Omega": "310",
        "Patek Philippe": "5711",
        "Audemars Piguet": "15",
        "TAG Heuer": "CAR",
        "Breitling": "AB",
        "IWC": "IW",
        "Cartier": "W",
        "Panerai": "PAM",
        "Jaeger-LeCoultre": "Q",
        "Zenith": "03",
        "Tudor": "M79",
        "Seiko": "SPB",
        "Longines": "L"
    }
    prefix = prefixes.get(make, "REF")
    return f"{prefix}{600 + index:03d}"

# Price ranges by brand (in EUR)
PRICE_RANGES = {
    "Rolex": (8000, 15000),
    "Omega": (4000, 8000),
    "Patek Philippe": (25000, 50000),
    "Audemars Piguet": (20000, 40000),
    "TAG Heuer": (2500, 6000),
    "Breitling": (3500, 8000),
    "IWC": (5000, 12000),
    "Cartier": (4000, 10000),
    "Panerai": (6000, 12000),
    "Jaeger-LeCoultre": (7000, 15000),
    "Zenith": (5000, 10000),
    "Tudor": (2500, 5000),
    "Seiko": (500, 8000),
    "Longines": (1500, 4000)
}

# Cloudinary image URL - using the same image for all watches for now
CLOUDINARY_IMAGE_URL = "https://res.cloudinary.com/dbgxf4exk/image/upload/v1777168524/13-Hour-Brown-Wrist-Watch-3_t2qu19.jpg"

def generate_cloudinary_url(index):
    """Generate Cloudinary URL for watch images"""
    # Using the same image for all watches
    return CLOUDINARY_IMAGE_URL

def seed_database():
    db = SessionLocal()
    
    try:
        # Clear existing watches
        db.query(Watch).delete()
        db.commit()
        print("Cleared existing watch data")
        
        # Create watches with variations
        watch_count = 0
        for idx, watch_data in enumerate(WATCH_DATA):
            # Create 1-2 variations per model (different years/colors)
            variations = 1 if idx % 3 == 0 else 2
            
            for var in range(variations):
                make = watch_data["make"]
                price_range = PRICE_RANGES.get(make, (2000, 8000))
                
                # Calculate price with some variation
                base_price = (price_range[0] + price_range[1]) / 2
                price_variation = (price_range[1] - price_range[0]) * 0.2
                import random
                price = base_price + random.uniform(-price_variation, price_variation)
                
                watch = Watch(
                    make_name=make,
                    model_name=watch_data["model"],
                    family_name=watch_data["family"],
                    year_produced=YEARS[watch_count % len(YEARS)],
                    reference=generate_reference(make, watch_data["model"], watch_count),
                    movement_name=watch_data["movement"],
                    case_material=watch_data["case_material"],
                    case_diameter=watch_data["case_diameter"],
                    dial_color=watch_data["dial_color"],
                    price_euro=round(price, 2),
                    description=f"Exceptional {make} {watch_data['model']} from the {watch_data['family']} collection. Features {watch_data['movement']} movement with {watch_data['functions']}.",
                    image_url=generate_cloudinary_url(watch_count % 86),  # Cycle through 86 images
                    functions=watch_data["functions"],
                    limited_edition="No" if watch_count % 5 != 0 else "Limited Edition",
                    water_resistance=watch_data["water_resistance"]
                )
                
                db.add(watch)
                watch_count += 1
                
                if watch_count >= 86:  # Stop at 86 to match image count
                    break
            
            if watch_count >= 86:
                break
        
        db.commit()
        print(f"Successfully seeded {watch_count} watches!")
        
        # Print summary
        makes = db.query(Watch.make_name).distinct().count()
        print(f"Total unique makes: {makes}")
        
    except Exception as e:
        print(f"Error seeding database: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    print("Starting database seed...")
    seed_database()
    print("Seed complete!")
