"""
Test script to create a sample customer account
"""

from app.database import SessionLocal
from app.models.user import User
from app.core.security import hash_password

def create_test_customer():
    db = SessionLocal()
    try:
        # Check if customer already exists
        existing = db.query(User).filter(User.email == "customer@example.com").first()
        if existing:
            print("✓ Test customer already exists:")
            print(f"  Email: {existing.email}")
            print(f"  Role: {existing.role}")
            return
        
        # Create test customer
        customer = User(
            full_name="Test Customer",
            email="customer@example.com",
            hashed_password=hash_password("password123"),
            role="customer",
            is_active=True
        )
        
        db.add(customer)
        db.commit()
        db.refresh(customer)
        
        print("✓ Test customer created successfully!")
        print(f"  Email: {customer.email}")
        print(f"  Password: password123")
        print(f"  Role: {customer.role}")
        
    except Exception as e:
        print(f"❌ Error: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    create_test_customer()
