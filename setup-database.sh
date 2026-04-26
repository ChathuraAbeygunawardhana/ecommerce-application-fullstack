#!/bin/bash

echo "========================================="
echo "Watch Collection Database Setup"
echo "========================================="
echo ""

# Check if PostgreSQL is running
echo "1. Checking PostgreSQL connection..."
if docker ps | grep -q postgres; then
    echo "✅ PostgreSQL container is running"
else
    echo "❌ PostgreSQL container is not running"
    echo "Please start PostgreSQL first:"
    echo "  docker run -d -p 5432:5432 -e POSTGRES_PASSWORD=mysecretpassword postgres"
    exit 1
fi

echo ""
echo "2. Installing Python dependencies..."
cd backend
pip install -r requirements.txt

echo ""
echo "3. Seeding database with watch data..."
python seed_watches.py

echo ""
echo "========================================="
echo "✅ Setup Complete!"
echo "========================================="
echo ""
echo "Next steps:"
echo "1. Update Cloudinary URLs in backend/seed_watches.py"
echo "2. Re-run: python backend/seed_watches.py"
echo "3. Start backend: cd backend && uvicorn main:app --reload"
echo "4. Start frontend: cd frontend && npm run dev"
echo ""
echo "Or use the start-dev.sh script to start both servers"
echo ""
