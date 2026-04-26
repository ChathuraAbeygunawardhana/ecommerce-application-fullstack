"""
Script to update Cloudinary image URLs in the database
After uploading your 86 images to Cloudinary, update the CLOUDINARY_URLS list below
with the actual URLs from your collection, then run: python update_cloudinary_urls.py
"""
import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from main import Watch
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:mysecretpassword@localhost:5432/postgres")
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# TODO: Replace these with your actual Cloudinary image URLs
# You can get these from your Cloudinary collection
# Format: https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1/YOUR_FOLDER/image_name.jpg
CLOUDINARY_URLS = [
    # Example URLs - replace with your actual URLs
    "https://res.cloudinary.com/dbgxf4exk/image/upload/v1/watches/watch_01.jpg",
    "https://res.cloudinary.com/dbgxf4exk/image/upload/v1/watches/watch_02.jpg",
    # ... add all 86 URLs here
]

def update_watch_images():
    """Update all watch records with Cloudinary image URLs"""
    db = SessionLocal()
    
    try:
        watches = db.query(Watch).order_by(Watch.id).all()
        
        print(f"Found {len(watches)} watches in database")
        print(f"Have {len(CLOUDINARY_URLS)} Cloudinary URLs")
        
        if len(CLOUDINARY_URLS) == 0:
            print("\n⚠️  WARNING: No Cloudinary URLs provided!")
            print("Please update the CLOUDINARY_URLS list in this script with your actual image URLs")
            return
        
        updated_count = 0
        for idx, watch in enumerate(watches):
            # Cycle through available URLs if we have fewer URLs than watches
            url_index = idx % len(CLOUDINARY_URLS)
            watch.image_url = CLOUDINARY_URLS[url_index]
            updated_count += 1
        
        db.commit()
        print(f"\n✅ Successfully updated {updated_count} watch images!")
        
    except Exception as e:
        print(f"\n❌ Error updating images: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    print("Starting Cloudinary URL update...")
    print("=" * 50)
    update_watch_images()
    print("=" * 50)
    print("Update complete!")
