# Watch Collection API - Backend

A modular FastAPI backend for the Watch Collection application.

## Project Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py              # Application entry point
│   ├── config.py            # Configuration and settings
│   ├── database.py          # Database connection and setup
│   │
│   ├── models/              # SQLAlchemy ORM models
│   │   ├── __init__.py
│   │   ├── product.py
│   │   ├── user.py
│   │   └── watch.py
│   │
│   ├── schemas/             # Pydantic schemas for validation
│   │   ├── __init__.py
│   │   ├── product.py
│   │   ├── user.py
│   │   └── watch.py
│   │
│   ├── api/                 # API routes
│   │   ├── __init__.py
│   │   ├── deps.py          # Shared dependencies
│   │   └── v1/              # API version 1
│   │       ├── __init__.py
│   │       ├── auth.py      # Authentication endpoints
│   │       ├── products.py  # Product endpoints
│   │       └── watches.py   # Watch endpoints
│   │
│   └── core/                # Core utilities
│       ├── __init__.py
│       └── security.py      # Security functions (hashing, JWT)
│
├── main.py                  # Backward compatibility wrapper
├── requirements.txt         # Python dependencies
└── README.md               # This file
```

## Architecture

### Separation of Concerns

- **Models** (`app/models/`): SQLAlchemy ORM models defining database tables
- **Schemas** (`app/schemas/`): Pydantic models for request/response validation
- **API Routes** (`app/api/v1/`): FastAPI route handlers organized by resource
- **Dependencies** (`app/api/deps.py`): Shared dependencies like database sessions
- **Configuration** (`app/config.py`): Centralized settings management
- **Core** (`app/core/`): Reusable utilities and business logic

### Benefits

1. **Modularity**: Each component has a single responsibility
2. **Scalability**: Easy to add new features without touching existing code
3. **Testability**: Components can be tested in isolation
4. **Maintainability**: Clear structure makes code easier to understand
5. **Versioning**: API versioning support (v1, v2, etc.)

## Running the Application

### Development Mode

```bash
# From the backend directory
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Backward Compatibility

The old `main.py` still works for backward compatibility:

```bash
uvicorn main:app --reload
```

## API Endpoints

### Base URL: `http://localhost:8000`

### Health & Info
- `GET /` - Root endpoint with API info
- `GET /health` - Health check
- `GET /api/db-test` - Test database connection

### Authentication (`/api/auth`)
- `POST /api/auth/sign-up` - Register new user
- `POST /api/auth/sign-in` - Login user

### Products (`/api/products`)
- `GET /api/products` - List products
- `POST /api/products` - Create product

### Watches (`/api/watches`)
- `GET /api/watches` - List watches (with pagination and filters)
- `GET /api/watches/{id}` - Get watch details
- `GET /api/watches/makes` - List all watch manufacturers
- `GET /api/watches/models` - List all watch models

## Configuration

Configuration is managed in `app/config.py`. Environment variables:

- `DATABASE_URL` - PostgreSQL connection string
- Default: `postgresql://postgres:mysecretpassword@localhost:5432/postgres`

## Database

The application uses PostgreSQL with SQLAlchemy ORM. Tables are automatically created on startup.

### Models

- **User**: User accounts with authentication
- **Product**: Sample product catalog
- **Watch**: Watch collection with detailed specifications

## Future Improvements

### Security
- [ ] Implement proper password hashing (bcrypt/passlib)
- [ ] Add JWT token authentication
- [ ] Add role-based access control (RBAC)
- [ ] Add rate limiting

### Features
- [ ] Add watch image upload
- [ ] Add user favorites/wishlist
- [ ] Add search with Elasticsearch
- [ ] Add caching with Redis

### Testing
- [ ] Add unit tests
- [ ] Add integration tests
- [ ] Add API documentation tests

### DevOps
- [ ] Add Docker support
- [ ] Add CI/CD pipeline
- [ ] Add logging and monitoring
- [ ] Add database migrations (Alembic)

## API Documentation

FastAPI automatically generates interactive API documentation:

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc
- **OpenAPI JSON**: http://localhost:8000/api/openapi.json
