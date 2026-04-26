# Quick Start Guide - Role-Based Access Control

## ✅ Setup Complete!

Your application now has a complete role-based access control system with admin and customer roles.

## 🔑 Account Credentials

### Admin Account
```
Email: admin@gmail.com
Password: adminpassword
```

### Test Customer Account
```
Email: customer@example.com
Password: password123
```

## 🚀 Start the Application

```bash
./start-dev.sh
```

## 🎯 What You Can Do Now

### As Admin
- ✅ View analytics dashboard (`GET /api/v1/admin/analytics`)
- ✅ View all users and customers
- ✅ Create, update, delete products
- ✅ Create, update, delete watches
- ✅ Access all customer features

### As Customer
- ✅ Browse products and watches
- ✅ View product details
- ✅ Sign up and sign in
- ❌ Cannot access admin endpoints
- ❌ Cannot modify products/watches

## 📝 Quick Test

### 1. Sign in as Admin
```bash
curl -X POST http://localhost:8000/api/v1/auth/sign-in \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@gmail.com", "password": "adminpassword"}'
```

### 2. Use the token to access admin analytics
```bash
curl -X GET http://localhost:8000/api/v1/admin/analytics \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## 📚 Documentation

- **ADMIN_SETUP.md** - Detailed setup instructions and API documentation
- **TESTING_GUIDE.md** - Comprehensive testing guide with examples
- **ROLE_IMPLEMENTATION_SUMMARY.md** - Technical implementation details

## 🔐 Security Features

- ✅ Bcrypt password hashing
- ✅ JWT token authentication (30 min expiration)
- ✅ Role-based authorization
- ✅ Protected admin endpoints
- ✅ Automatic token injection in frontend

## 🌐 Access Points

- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs
- **Frontend**: http://localhost:3000
- **Sign In**: http://localhost:3000/sign-in

## ⚡ Key Endpoints

### Public Endpoints
- `POST /api/v1/auth/sign-up` - Register new customer
- `POST /api/v1/auth/sign-in` - Login
- `GET /api/v1/products` - List products
- `GET /api/v1/watches` - List watches

### Admin-Only Endpoints
- `GET /api/v1/admin/analytics` - Dashboard analytics
- `GET /api/v1/admin/users` - All users
- `GET /api/v1/admin/customers` - All customers
- `POST /api/v1/products` - Create product
- `PUT /api/v1/products/{id}` - Update product
- `DELETE /api/v1/products/{id}` - Delete product
- `POST /api/v1/watches` - Create watch
- `PUT /api/v1/watches/{id}` - Update watch
- `DELETE /api/v1/watches/{id}` - Delete watch

## 🛠️ Troubleshooting

### Dependencies not installed?
```bash
cd backend
source .venv/bin/activate
pip install bcrypt python-jose[cryptography]
```

### Admin user not created?
```bash
cd backend
source .venv/bin/activate
python seed_admin.py
```

### Need a test customer?
```bash
cd backend
source .venv/bin/activate
python test_customer.py
```

## 📊 Test the Setup

```bash
cd backend
source .venv/bin/activate
python test_admin.py
```

Expected output:
```
✓ Admin user found:
  Email: admin@gmail.com
  Role: admin
  Active: True

✓ Password verification successful!
✓ JWT Token generated
✓ All tests passed!
```

## 🎉 You're Ready!

Start the application and sign in with the admin credentials to access all features.

For detailed testing instructions, see **TESTING_GUIDE.md**.
