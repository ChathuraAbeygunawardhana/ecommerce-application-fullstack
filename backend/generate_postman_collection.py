#!/usr/bin/env python3
"""
Generate Postman Collection from FastAPI Backend
This script creates a Postman collection with all API endpoints

Usage:
    python3 generate_postman_collection.py
"""
import json
from datetime import datetime

# Base configuration
BASE_URL = "http://localhost:8000"
API_PREFIX = "/api"

# Postman collection structure
collection = {
    "info": {
        "name": "Watch Collection API",
        "description": "Complete API collection for Watch Collection application",
        "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
        "_postman_id": "watch-collection-api",
        "version": "1.0.0"
    },
    "auth": {
        "type": "bearer",
        "bearer": [
            {
                "key": "token",
                "value": "{{access_token}}",
                "type": "string"
            }
        ]
    },
    "variable": [
        {
            "key": "base_url",
            "value": BASE_URL,
            "type": "string"
        },
        {
            "key": "access_token",
            "value": "",
            "type": "string"
        },
        {
            "key": "admin_token",
            "value": "",
            "type": "string"
        }
    ],
    "item": []
}

# Authentication endpoints
auth_folder = {
    "name": "Authentication",
    "item": [
        {
            "name": "Sign Up",
            "request": {
                "method": "POST",
                "header": [{"key": "Content-Type", "value": "application/json"}],
                "body": {
                    "mode": "raw",
                    "raw": json.dumps({
                        "name": "John Doe",
                        "email": "john@example.com",
                        "password": "password123"
                    }, indent=2)
                },
                "url": {
                    "raw": "{{base_url}}" + API_PREFIX + "/auth/sign-up",
                    "host": ["{{base_url}}"],
                    "path": ["api", "auth", "sign-up"]
                }
            },
            "response": []
        },
        {
            "name": "Sign In (Customer)",
            "event": [
                {
                    "listen": "test",
                    "script": {
                        "exec": [
                            "var jsonData = pm.response.json();",
                            "if (jsonData.access_token) {",
                            "    pm.collectionVariables.set('access_token', jsonData.access_token);",
                            "}"
                        ],
                        "type": "text/javascript"
                    }
                }
            ],
            "request": {
                "method": "POST",
                "header": [{"key": "Content-Type", "value": "application/json"}],
                "body": {
                    "mode": "raw",
                    "raw": json.dumps({
                        "email": "john@example.com",
                        "password": "password123"
                    }, indent=2)
                },
                "url": {
                    "raw": "{{base_url}}" + API_PREFIX + "/auth/sign-in",
                    "host": ["{{base_url}}"],
                    "path": ["api", "auth", "sign-in"]
                }
            },
            "response": []
        },
        {
            "name": "Sign In (Admin)",
            "event": [
                {
                    "listen": "test",
                    "script": {
                        "exec": [
                            "var jsonData = pm.response.json();",
                            "if (jsonData.access_token) {",
                            "    pm.collectionVariables.set('admin_token', jsonData.access_token);",
                            "    pm.collectionVariables.set('access_token', jsonData.access_token);",
                            "}"
                        ],
                        "type": "text/javascript"
                    }
                }
            ],
            "request": {
                "method": "POST",
                "header": [{"key": "Content-Type", "value": "application/json"}],
                "body": {
                    "mode": "raw",
                    "raw": json.dumps({
                        "email": "admin@example.com",
                        "password": "admin123"
                    }, indent=2)
                },
                "url": {
                    "raw": "{{base_url}}" + API_PREFIX + "/auth/sign-in",
                    "host": ["{{base_url}}"],
                    "path": ["api", "auth", "sign-in"]
                }
            },
            "response": []
        },
        {
            "name": "Get Current User",
            "request": {
                "auth": {"type": "bearer", "bearer": [{"key": "token", "value": "{{access_token}}", "type": "string"}]},
                "method": "GET",
                "header": [],
                "url": {
                    "raw": "{{base_url}}" + API_PREFIX + "/auth/me",
                    "host": ["{{base_url}}"],
                    "path": ["api", "auth", "me"]
                }
            },
            "response": []
        }
    ]
}

# Watches endpoints
watches_folder = {
    "name": "Watches",
    "item": [
        {
            "name": "Get All Watches",
            "request": {
                "method": "GET",
                "header": [],
                "url": {
                    "raw": "{{base_url}}" + API_PREFIX + "/watches?page=1&limit=20",
                    "host": ["{{base_url}}"],
                    "path": ["api", "watches"],
                    "query": [
                        {"key": "page", "value": "1"},
                        {"key": "limit", "value": "20"}
                    ]
                }
            },
            "response": []
        },
        {
            "name": "Get Watches by Make",
            "request": {
                "method": "GET",
                "header": [],
                "url": {
                    "raw": "{{base_url}}" + API_PREFIX + "/watches?make=Rolex&page=1&limit=20",
                    "host": ["{{base_url}}"],
                    "path": ["api", "watches"],
                    "query": [
                        {"key": "make", "value": "Rolex"},
                        {"key": "page", "value": "1"},
                        {"key": "limit", "value": "20"}
                    ]
                }
            },
            "response": []
        },
        {
            "name": "Get Watches by Model",
            "request": {
                "method": "GET",
                "header": [],
                "url": {
                    "raw": "{{base_url}}" + API_PREFIX + "/watches?model=Submariner&page=1&limit=20",
                    "host": ["{{base_url}}"],
                    "path": ["api", "watches"],
                    "query": [
                        {"key": "model", "value": "Submariner"},
                        {"key": "page", "value": "1"},
                        {"key": "limit", "value": "20"}
                    ]
                }
            },
            "response": []
        },
        {
            "name": "Search Watches",
            "request": {
                "method": "GET",
                "header": [],
                "url": {
                    "raw": "{{base_url}}" + API_PREFIX + "/watches?search=Rolex&page=1&limit=20",
                    "host": ["{{base_url}}"],
                    "path": ["api", "watches"],
                    "query": [
                        {"key": "search", "value": "Rolex"},
                        {"key": "page", "value": "1"},
                        {"key": "limit", "value": "20"}
                    ]
                }
            },
            "response": []
        },
        {
            "name": "Get Watch by ID",
            "request": {
                "method": "GET",
                "header": [],
                "url": {
                    "raw": "{{base_url}}" + API_PREFIX + "/watches/1",
                    "host": ["{{base_url}}"],
                    "path": ["api", "watches", "1"]
                }
            },
            "response": []
        },
        {
            "name": "Get All Makes",
            "request": {
                "method": "GET",
                "header": [],
                "url": {
                    "raw": "{{base_url}}" + API_PREFIX + "/watches/makes",
                    "host": ["{{base_url}}"],
                    "path": ["api", "watches", "makes"]
                }
            },
            "response": []
        },
        {
            "name": "Get All Models",
            "request": {
                "method": "GET",
                "header": [],
                "url": {
                    "raw": "{{base_url}}" + API_PREFIX + "/watches/models",
                    "host": ["{{base_url}}"],
                    "path": ["api", "watches", "models"]
                }
            },
            "response": []
        },
        {
            "name": "Get Models by Make",
            "request": {
                "method": "GET",
                "header": [],
                "url": {
                    "raw": "{{base_url}}" + API_PREFIX + "/watches/models?make=Rolex",
                    "host": ["{{base_url}}"],
                    "path": ["api", "watches", "models"],
                    "query": [{"key": "make", "value": "Rolex"}]
                }
            },
            "response": []
        },
        {
            "name": "Create Watch (Admin)",
            "request": {
                "auth": {"type": "bearer", "bearer": [{"key": "token", "value": "{{admin_token}}", "type": "string"}]},
                "method": "POST",
                "header": [{"key": "Content-Type", "value": "application/json"}],
                "body": {
                    "mode": "raw",
                    "raw": json.dumps({
                        "make_name": "Rolex",
                        "model_name": "Submariner",
                        "reference": "116610LN",
                        "case_size": "40mm",
                        "case_material": "Stainless Steel",
                        "dial_color": "Black",
                        "movement": "Automatic",
                        "water_resistance": "300m",
                        "year_introduced": 2010,
                        "image_url": "https://example.com/image.jpg"
                    }, indent=2)
                },
                "url": {
                    "raw": "{{base_url}}" + API_PREFIX + "/watches",
                    "host": ["{{base_url}}"],
                    "path": ["api", "watches"]
                }
            },
            "response": []
        },
        {
            "name": "Update Watch (Admin)",
            "request": {
                "auth": {"type": "bearer", "bearer": [{"key": "token", "value": "{{admin_token}}", "type": "string"}]},
                "method": "PUT",
                "header": [{"key": "Content-Type", "value": "application/json"}],
                "body": {
                    "mode": "raw",
                    "raw": json.dumps({
                        "case_size": "41mm",
                        "year_introduced": 2020
                    }, indent=2)
                },
                "url": {
                    "raw": "{{base_url}}" + API_PREFIX + "/watches/1",
                    "host": ["{{base_url}}"],
                    "path": ["api", "watches", "1"]
                }
            },
            "response": []
        },
        {
            "name": "Delete Watch (Admin)",
            "request": {
                "auth": {"type": "bearer", "bearer": [{"key": "token", "value": "{{admin_token}}", "type": "string"}]},
                "method": "DELETE",
                "header": [],
                "url": {
                    "raw": "{{base_url}}" + API_PREFIX + "/watches/1",
                    "host": ["{{base_url}}"],
                    "path": ["api", "watches", "1"]
                }
            },
            "response": []
        }
    ]
}

# Admin endpoints
admin_folder = {
    "name": "Admin",
    "item": [
        {
            "name": "Get Analytics",
            "request": {
                "auth": {"type": "bearer", "bearer": [{"key": "token", "value": "{{admin_token}}", "type": "string"}]},
                "method": "GET",
                "header": [],
                "url": {
                    "raw": "{{base_url}}" + API_PREFIX + "/admin/analytics",
                    "host": ["{{base_url}}"],
                    "path": ["api", "admin", "analytics"]
                }
            },
            "response": []
        },
        {
            "name": "Get All Users",
            "request": {
                "auth": {"type": "bearer", "bearer": [{"key": "token", "value": "{{admin_token}}", "type": "string"}]},
                "method": "GET",
                "header": [],
                "url": {
                    "raw": "{{base_url}}" + API_PREFIX + "/admin/users?skip=0&limit=50",
                    "host": ["{{base_url}}"],
                    "path": ["api", "admin", "users"],
                    "query": [
                        {"key": "skip", "value": "0"},
                        {"key": "limit", "value": "50"}
                    ]
                }
            },
            "response": []
        },
        {
            "name": "Get All Customers",
            "request": {
                "auth": {"type": "bearer", "bearer": [{"key": "token", "value": "{{admin_token}}", "type": "string"}]},
                "method": "GET",
                "header": [],
                "url": {
                    "raw": "{{base_url}}" + API_PREFIX + "/admin/customers?skip=0&limit=50",
                    "host": ["{{base_url}}"],
                    "path": ["api", "admin", "customers"],
                    "query": [
                        {"key": "skip", "value": "0"},
                        {"key": "limit", "value": "50"}
                    ]
                }
            },
            "response": []
        }
    ]
}

# Products endpoints
products_folder = {
    "name": "Products",
    "item": [
        {
            "name": "Get All Products",
            "request": {
                "method": "GET",
                "header": [],
                "url": {
                    "raw": "{{base_url}}" + API_PREFIX + "/products?skip=0&limit=10",
                    "host": ["{{base_url}}"],
                    "path": ["api", "products"],
                    "query": [
                        {"key": "skip", "value": "0"},
                        {"key": "limit", "value": "10"}
                    ]
                }
            },
            "response": []
        },
        {
            "name": "Get Product by ID",
            "request": {
                "method": "GET",
                "header": [],
                "url": {
                    "raw": "{{base_url}}" + API_PREFIX + "/products/1",
                    "host": ["{{base_url}}"],
                    "path": ["api", "products", "1"]
                }
            },
            "response": []
        },
        {
            "name": "Create Product (Admin)",
            "request": {
                "auth": {"type": "bearer", "bearer": [{"key": "token", "value": "{{admin_token}}", "type": "string"}]},
                "method": "POST",
                "header": [{"key": "Content-Type", "value": "application/json"}],
                "body": {
                    "mode": "raw",
                    "raw": json.dumps({
                        "name": "Sample Product",
                        "description": "Product description",
                        "price": 99.99
                    }, indent=2)
                },
                "url": {
                    "raw": "{{base_url}}" + API_PREFIX + "/products",
                    "host": ["{{base_url}}"],
                    "path": ["api", "products"]
                }
            },
            "response": []
        },
        {
            "name": "Update Product (Admin)",
            "request": {
                "auth": {"type": "bearer", "bearer": [{"key": "token", "value": "{{admin_token}}", "type": "string"}]},
                "method": "PUT",
                "header": [{"key": "Content-Type", "value": "application/json"}],
                "body": {
                    "mode": "raw",
                    "raw": json.dumps({
                        "name": "Updated Product",
                        "price": 149.99
                    }, indent=2)
                },
                "url": {
                    "raw": "{{base_url}}" + API_PREFIX + "/products/1",
                    "host": ["{{base_url}}"],
                    "path": ["api", "products", "1"]
                }
            },
            "response": []
        },
        {
            "name": "Delete Product (Admin)",
            "request": {
                "auth": {"type": "bearer", "bearer": [{"key": "token", "value": "{{admin_token}}", "type": "string"}]},
                "method": "DELETE",
                "header": [],
                "url": {
                    "raw": "{{base_url}}" + API_PREFIX + "/products/1",
                    "host": ["{{base_url}}"],
                    "path": ["api", "products", "1"]
                }
            },
            "response": []
        }
    ]
}

# Health check endpoints
health_folder = {
    "name": "Health & Info",
    "item": [
        {
            "name": "Root",
            "request": {
                "method": "GET",
                "header": [],
                "url": {
                    "raw": "{{base_url}}/",
                    "host": ["{{base_url}}"],
                    "path": [""]
                }
            },
            "response": []
        },
        {
            "name": "Health Check",
            "request": {
                "method": "GET",
                "header": [],
                "url": {
                    "raw": "{{base_url}}/health",
                    "host": ["{{base_url}}"],
                    "path": ["health"]
                }
            },
            "response": []
        },
        {
            "name": "Database Test",
            "request": {
                "method": "GET",
                "header": [],
                "url": {
                    "raw": "{{base_url}}" + API_PREFIX + "/db-test",
                    "host": ["{{base_url}}"],
                    "path": ["api", "db-test"]
                }
            },
            "response": []
        }
    ]
}

# Add all folders to collection
collection["item"] = [
    health_folder,
    auth_folder,
    watches_folder,
    admin_folder,
    products_folder
]

# Write to file
output_file = "Watch_Collection_API.postman_collection.json"
with open(output_file, "w") as f:
    json.dump(collection, f, indent=2)

print(f"✅ Postman collection generated successfully!")
print(f"📁 File: {output_file}")
print(f"\n📝 Import instructions:")
print(f"1. Open Postman")
print(f"2. Click 'Import' button")
print(f"3. Select the file: {output_file}")
print(f"4. The collection will be imported with all endpoints")
print(f"\n🔑 Authentication:")
print(f"- Use 'Sign In (Admin)' to get admin token (auto-saved)")
print(f"- Use 'Sign In (Customer)' to get customer token (auto-saved)")
print(f"- Admin endpoints use {{{{admin_token}}}}")
print(f"- Regular endpoints use {{{{access_token}}}}")
