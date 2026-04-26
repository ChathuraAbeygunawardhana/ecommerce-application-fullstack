# Admin Role Setup Guide

This guide explains how to set up and use the admin role functionality in the application.

## Features

### Admin Capabilities
- View analytics dashboard with customer and product statistics
- Full CRUD operations on products
- Full CRUD operations on watches
- View all users and customers
- Access protected admin endpoints

### Customer Capabilities
- Browse products and watches
- View product details
- Standard user features

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

The new dependencies include:
- `passlib[bcrypt]` - For secure password hashing
- `python-jose[cryptography]` - For JWT token generation and validation

### 2. Create Admin User

Run the admin seed script to create the admin account:

```bash
cd backend
python seed_admin.py
```

This will create an admin user with the following credentials:
- **Email**: admin@gmail.com
- **Password**: adminpassword

### 3. Start the Application

```bash
# From the root directory
./start-dev.sh
```

## API Endpoints

### Authentication
- `POST /api/v1/auth/sign-up` - Register new customer account
- `POST /api/v1/auth/sign-in` - Login and receive JWT token
- `GET /api/v1/auth/me` - Get current user info (requires authentication)

### Admin Endpoints (Require Admin Role)
- `GET /api/v1/admin/analytics` - Get dashboard analytics
- `GET /api/v1/admin/users` - Get all users
- `GET /api/v1/admin/customers` - Get all customers

### Products (Admin CRUD)
- `GET /api/v1/products` - List products (public)
- `GET /api/v1/products/{id}` - Get product details (public)
- `POST /api/v1/products` - Create product (admin only)
- `PUT /api/v1/products/{id}` - Update product (admin only)
- `DELETE /api/v1/products/{id}` - Delete product (admin only)

### Watches (Admin CRUD)
- `GET /api/v1/watches` - List watches (public)
- `GET /api/v1/watches/{id}` - Get watch details (public)
- `POST /api/v1/watches` - Create watch (admin only)
- `PUT /api/v1/watches/{id}` - Update watch (admin only)
- `DELETE /api/v1/watches/{id}` - Delete watch (admin only)

## Authentication Flow

### 1. Sign In
```bash
curl -X POST http://localhost:8000/api/v1/auth/sign-in \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@gmail.com",
    "password": "adminpassword"
  }'
```

Response:
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "user": {
    "id": 1,
    "full_name": "Admin User",
    "email": "admin@gmail.com",
    "role": "admin"
  }
}
```

### 2. Use Token for Protected Endpoints
```bash
curl -X GET http://localhost:8000/api/v1/admin/analytics \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

## Frontend Integration

The frontend has been updated with:

1. **JWT Token Storage**: Tokens are stored in localStorage
2. **Automatic Token Injection**: API client automatically adds Bearer token to requests
3. **Auth Service Updates**: New methods for token management and role checking
4. **Admin Service**: Service for admin-specific API calls

### Using Auth in Frontend

```typescript
import { authService } from '@/lib/services/authService';

// Sign in
const response = await authService.signIn({
  email: 'admin@gmail.com',
  password: 'adminpassword'
});

// Check if user is admin
const isAdmin = authService.isAdmin();

// Get current user
const user = authService.getCurrentUser();

// Sign out
authService.signOut();
```

### Using Admin Service

```typescript
import { adminService } from '@/lib/services/adminService';

// Get analytics (admin only)
const analytics = await adminService.getAnalytics();

// Get all customers (admin only)
const customers = await adminService.getCustomers();
```

## Security Notes

1. **Change Secret Key**: Update `SECRET_KEY` in `backend/app/core/security.py` to a secure random string in production
2. **Environment Variables**: Move sensitive configuration to environment variables
3. **Token Expiration**: Tokens expire after 30 minutes by default
4. **Password Requirements**: Consider adding password strength requirements
5. **Rate Limiting**: Add rate limiting to prevent brute force attacks

## Testing

### Test Admin Login
```bash
curl -X POST http://localhost:8000/api/v1/auth/sign-in \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@gmail.com", "password": "adminpassword"}'
```

### Test Customer Registration
```bash
curl -X POST http://localhost:8000/api/v1/auth/sign-up \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Test Admin Analytics
```bash
# First get token from sign-in, then:
curl -X GET http://localhost:8000/api/v1/admin/analytics \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Troubleshooting

### "Invalid authentication credentials"
- Ensure you're including the Bearer token in the Authorization header
- Check that the token hasn't expired
- Verify you're using the correct token format: `Bearer <token>`

### "Not enough permissions"
- Verify the user has the admin role in the database
- Check that you're logged in with the admin account

### Import errors
- Make sure all dependencies are installed: `pip install -r requirements.txt`
- Activate your virtual environment if using one
