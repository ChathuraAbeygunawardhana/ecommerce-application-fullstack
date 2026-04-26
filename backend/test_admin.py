"""
Quick test script to verify admin authentication works
"""

from app.database import SessionLocal
from app.models.user import User
from app.core.security import verify_password, create_access_token

def test_admin_auth():
    db = SessionLocal()
    try:
        # Find admin user
        admin = db.query(User).filter(User.email == "admin@gmail.com").first()
        
        if not admin:
            print("❌ Admin user not found!")
            return
        
        print("✓ Admin user found:")
        print(f"  Email: {admin.email}")
        print(f"  Role: {admin.role}")
        print(f"  Active: {admin.is_active}")
        
        # Test password verification
        password_valid = verify_password("adminpassword", admin.hashed_password)
        
        if password_valid:
            print("\n✓ Password verification successful!")
            
            # Generate token
            token = create_access_token(data={"sub": admin.id, "role": admin.role})
            print(f"\n✓ JWT Token generated:")
            print(f"  {token[:50]}...")
            
            print("\n✓ All tests passed! Admin authentication is working correctly.")
        else:
            print("\n❌ Password verification failed!")
            
    except Exception as e:
        print(f"❌ Error: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    test_admin_auth()
