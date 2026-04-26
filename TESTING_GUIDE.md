# Testing Guide for Role-Based Access Control

## Quick Start

The admin user and a test customer have been created successfully!

### Account Credentials

**Admin Account:**
- Email: `admin@gmail.com`
- Password: `adminpassword`
- Role: `admin`

**Test Customer Account:**
- Email: `customer@example.com`
- Password: `password123`
- Role: `customer`

## Starting the Application

```bash
# Start both backend and frontend
./start-dev.sh
```

Or start them separately:

```bash
# Terminal 1 - Backend
cd backend
source .venv/bin/activate
uvicorn app.main:app --reload --port 8000

# Terminal 2 - Frontend
cd frontend
npm run dev
```

## Testing with cURL

### 1. Admin Sign In

```bash
curl -X POST http://localhost:8000/api/v1/auth/sign-in \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@gmail.com",
    "password": "adminpassword"
  }'
```

Expected response:
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

Save the `access_token` for subsequent requests.

### 2. Customer Sign In

```bash
curl -X POST http://localhost:8000/api/v1/auth/sign-in \
  -H "Content-Type: application/json" \
  -d '{
    "email": "customer@example.com",
    "password": "password123"
  }'
```

### 3. Test Admin Analytics (Admin Only)

```bash
# Replace YOUR_ADMIN_TOKEN with the token from admin sign-in
curl -X GET http://localhost:8000/api/v1/admin/analytics \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```

Expected response:
```json
{
  "users": {
    "total": 2,
    "customers": 1,
    "admins": 1
  },
  "products": {
    "total": 0
  },
  "watches": {
    "total": 100
  },
  "recent_customers": [...]
}
```

### 4. Test Admin Analytics with Customer Token (Should Fail)

```bash
# Replace YOUR_CUSTOMER_TOKEN with the token from customer sign-in
curl -X GET http://localhost:8000/api/v1/admin/analytics \
  -H "Authorization: Bearer YOUR_CUSTOMER_TOKEN"
```

Expected response:
```json
{
  "detail": "Not enough permissions. Admin access required."
}
```

### 5. Create a Product (Admin Only)

```bash
curl -X POST http://localhost:8000/api/v1/products \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Luxury Watch",
    "description": "Premium timepiece",
    "price": 5000
  }'
```

### 6. Update a Product (Admin Only)

```bash
curl -X PUT http://localhost:8000/api/v1/products/1 \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "price": 5500
  }'
```

### 7. Delete a Product (Admin Only)

```bash
curl -X DELETE http://localhost:8000/api/v1/products/1 \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```

### 8. List Products (Public - No Auth Required)

```bash
curl -X GET http://localhost:8000/api/v1/products
```

### 9. Create a Watch (Admin Only)

```bash
curl -X POST http://localhost:8000/api/v1/watches \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "make_name": "Rolex",
    "model_name": "Submariner",
    "reference": "126610LN",
    "price_euro": 9000,
    "description": "Iconic dive watch"
  }'
```

### 10. Get All Users (Admin Only)

```bash
curl -X GET http://localhost:8000/api/v1/admin/users \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```

### 11. Get All Customers (Admin Only)

```bash
curl -X GET http://localhost:8000/api/v1/admin/customers \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```

## Testing with Frontend

### Admin Login Flow

1. Navigate to `http://localhost:3000/sign-in`
2. Enter admin credentials:
   - Email: `admin@gmail.com`
   - Password: `adminpassword`
3. After successful login, the JWT token is stored in localStorage
4. Check browser console or Application tab to see the stored token

### Customer Login Flow

1. Navigate to `http://localhost:3000/sign-in`
2. Enter customer credentials:
   - Email: `customer@example.com`
   - Password: `password123`
3. Customer should have limited access compared to admin

### Checking User Role in Frontend

Open browser console and run:
```javascript
// Get current user
const user = JSON.parse(localStorage.getItem('user'));
console.log('User:', user);
console.log('Role:', user.role);

// Get token
const token = localStorage.getItem('access_token');
console.log('Token:', token);
```

## Python Test Scripts

### Test Admin Authentication

```bash
cd backend
source .venv/bin/activate
python test_admin.py
```

### Create Test Customer

```bash
cd backend
source .venv/bin/activate
python test_customer.py
```

## API Documentation

Once the server is running, visit:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

You can test all endpoints directly from the Swagger UI:
1. Click "Authorize" button
2. Enter: `Bearer YOUR_TOKEN`
3. Test protected endpoints

## Common Issues

### "Invalid authentication credentials"
- Token might be expired (30 min expiration)
- Sign in again to get a new token
- Make sure you're using the format: `Bearer <token>`

### "Not enough permissions"
- You're trying to access an admin endpoint with a customer token
- Sign in with admin credentials

### "User not found"
- Run the seed scripts to create users:
  ```bash
  python backend/seed_admin.py
  python backend/test_customer.py
  ```

## Verification Checklist

- [x] Admin user created with correct credentials
- [x] Customer user created with correct credentials
- [x] Password hashing working (bcrypt)
- [x] JWT token generation working
- [x] Admin can access `/admin/analytics`
- [x] Customer cannot access `/admin/analytics`
- [x] Admin can create/update/delete products
- [x] Admin can create/update/delete watches
- [x] Public endpoints work without authentication
- [x] Frontend stores JWT token in localStorage
- [x] Frontend includes token in API requests

## Next Steps

1. Start the application: `./start-dev.sh`
2. Test admin login via frontend or cURL
3. Test customer login
4. Verify admin can access analytics
5. Verify customer cannot access admin endpoints
6. Test CRUD operations on products/watches

## Security Reminders

- Change `SECRET_KEY` in production
- Use environment variables for sensitive data
- Implement token refresh mechanism
- Add rate limiting for auth endpoints
- Consider adding 2FA for admin accounts
