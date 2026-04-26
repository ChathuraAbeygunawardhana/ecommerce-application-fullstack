"""
DEPRECATED: This file is kept for backward compatibility.
The application has been refactored into a modular structure under the 'app' directory.

To run the application, use:
    uvicorn app.main:app --reload

New structure:
    app/
    ├── main.py          - Application entry point
    ├── config.py        - Configuration settings
    ├── database.py      - Database setup
    ├── models/          - SQLAlchemy models
    ├── schemas/         - Pydantic schemas
    ├── api/             - API routes
    │   ├── deps.py      - Dependencies
    │   └── v1/          - API version 1
    │       ├── auth.py
    │       ├── products.py
    │       └── watches.py
    └── core/            - Core utilities
        └── security.py  - Security functions
"""

# Import the app from the new modular structure
from app.main import app

# This allows running with: uvicorn main:app --reload
# for backward compatibility
__all__ = ["app"]
