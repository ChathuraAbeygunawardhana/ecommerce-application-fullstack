# Postman Collection Generator

This guide explains how to generate and use the Postman collection for the Watch Collection API.

## Generate Collection

Run the script to generate the Postman collection:

```bash
cd backend
python3 generate_postman_collection.py
```

This creates `Watch_Collection_API.postman_collection.json` with all API endpoints.

## Import to Postman

1. Open Postman
2. Click the "Import" button (top left)
3. Select the generated `Watch_Collection_API.postman_collection.json` file
4. Click "Import"

## Collection Structure

The collection includes these folders:

- **Health & Info** - Root, health check, and database test endpoints
- **Authentication** - Sign up, sign in, and user info endpoints
- **Watches** - All watch-related endpoints (public and admin)
- **Admin** - Admin-only analytics and user management
- **Products** - Product CRUD operations

## Authentication Flow

### For Customer Access:
1. Run "Sign In (Customer)" request
2. Token is automatically saved to `{{access_token}}` variable
3. Use this for authenticated customer endpoints

### For Admin Access:
1. Run "Sign In (Admin)" request
2. Token is automatically saved to both `{{admin_token}}` and `{{access_token}}`
3. Admin endpoints use `{{admin_token}}`

Default credentials (after running seed scripts):
- Admin: `admin@example.com` / `admin123`
- Customer: Create via "Sign Up" endpoint

## Collection Variables

The collection uses these variables:

- `{{base_url}}` - API base URL (default: http://localhost:8000)
- `{{access_token}}` - Customer/user JWT token (auto-set on sign-in)
- `{{admin_token}}` - Admin JWT token (auto-set on admin sign-in)

To change the base URL:
1. Click on the collection name
2. Go to "Variables" tab
3. Update the `base_url` value

## Example Requests

### Public Endpoints (No Auth Required)
- Get All Watches
- Get Watch by ID
- Get All Makes
- Get All Models
- Search Watches

### Customer Endpoints (Requires Auth)
- Get Current User

### Admin Endpoints (Requires Admin Auth)
- Get Analytics
- Get All Users
- Create/Update/Delete Watches
- Create/Update/Delete Products

## Tips

1. **Auto-save tokens**: Sign-in requests automatically save tokens to variables
2. **Test scripts**: Admin sign-in sets both `admin_token` and `access_token`
3. **Query parameters**: Easily modify pagination, filters, and search terms
4. **Request bodies**: Pre-filled with example data - modify as needed

## Customization

To customize the collection, edit `generate_postman_collection.py`:

- Change `BASE_URL` for different environments
- Add new endpoints following the existing pattern
- Modify request bodies with your test data
- Add more test scripts for automation

## Regenerate Collection

If you update your API, regenerate the collection:

```bash
python3 generate_postman_collection.py
```

Then re-import in Postman (it will update the existing collection).
