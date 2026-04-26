"""
Script to create the admin user in the database.
Run this script to create an admin account with credentials:
Email: admin@gmail.com
Password: adminpassword
"""

from app.database import SessionLocal
from app.models.user import User
from app.core.security import hash_password

def create_admin():
    db = SessionLocal()
    try:
        # Check if admin already exists
        existing_admin = db.query(User).filter(User.email == "admin@gmail.com").first()
        if existing_admin:
            print("Admin user already exists!")
            print(f"Email: {existing_admin.email}")
            print(f"Role: {existing_admin.role}")
            return
        
        # Create admin user
        admin_user = User(
            full_name="Admin User",
            email="admin@gmail.com",
            hashed_password=hash_password("adminpassword"),
            role="admin",
            is_active=True
        )
        
        db.add(admin_user)
        db.commit()
        db.refresh(admin_user)
        
        print("✓ Admin user created successfully!")
        print(f"Email: {admin_user.email}")
        print(f"Password: adminpassword")
        print(f"Role: {admin_user.role}")
        
    except Exception as e:
        print(f"Error creating admin user: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    create_admin()
