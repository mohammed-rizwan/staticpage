# Sugarwares API Documentation

This document outlines the API endpoints and functionality for the Sugarwares website.

## 🌐 Base URL

```
Production: https://api.sugarwares.com/v1
Development: https://dev-api.sugarwares.com/v1
Staging: https://staging-api.sugarwares.com/v1
```

## 🔐 Authentication

### API Key Authentication
```http
Authorization: Bearer YOUR_API_KEY
```

### Rate Limiting
- **Free Tier**: 100 requests/hour
- **Business Tier**: 1000 requests/hour
- **Enterprise Tier**: 10000 requests/hour

## 📋 Endpoints

### Products

#### Get All Products
```http
GET /products
```

**Query Parameters:**
- `category` (string): Filter by product category
- `size` (string): Filter by product size
- `material` (string): Filter by material type
- `page` (integer): Page number for pagination
- `limit` (integer): Number of products per page

**Response:**
```json
{
  "success": true,
  "data": {
    "products": [
      {
        "id": "prod_001",
        "name": "6-inch Round Plate",
        "category": "plates",
        "size": "6-inch",
        "material": "bagasse",
        "price": 0.15,
        "description": "Eco-friendly 6-inch round plate made from sugarcane bagasse",
        "images": ["image1.jpg", "image2.jpg"],
        "specifications": {
          "diameter": "6 inches",
          "thickness": "2mm",
          "weight": "15g"
        },
        "availability": true,
        "stock": 10000
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 150,
      "pages": 8
    }
  }
}
```

#### Get Product by ID
```http
GET /products/{product_id}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "product": {
      "id": "prod_001",
      "name": "6-inch Round Plate",
      "category": "plates",
      "size": "6-inch",
      "material": "bagasse",
      "price": 0.15,
      "description": "Eco-friendly 6-inch round plate made from sugarcane bagasse",
      "images": ["image1.jpg", "image2.jpg"],
      "specifications": {
        "diameter": "6 inches",
        "thickness": "2mm",
        "weight": "15g"
      },
      "availability": true,
      "stock": 10000,
      "related_products": ["prod_002", "prod_003"]
    }
  }
}
```

### Categories

#### Get All Categories
```http
GET /categories
```

**Response:**
```json
{
  "success": true,
  "data": {
    "categories": [
      {
        "id": "cat_001",
        "name": "Plates",
        "slug": "plates",
        "description": "Eco-friendly bagasse plates",
        "product_count": 45,
        "image": "plates-category.jpg"
      }
    ]
  }
}
```

### Orders

#### Create Order
```http
POST /orders
```

**Request Body:**
```json
{
  "customer": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "company": "Restaurant ABC"
  },
  "items": [
    {
      "product_id": "prod_001",
      "quantity": 1000,
      "unit_price": 0.15
    }
  ],
  "shipping_address": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zip": "10001",
    "country": "USA"
  },
  "notes": "Rush delivery needed"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "order": {
      "id": "ord_001",
      "status": "pending",
      "total": 150.00,
      "created_at": "2024-01-15T10:30:00Z",
      "estimated_delivery": "2024-01-20T10:30:00Z"
    }
  }
}
```

#### Get Order Status
```http
GET /orders/{order_id}
```

### Contact & Inquiries

#### Submit Contact Form
```http
POST /contact
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "subject": "Product Inquiry",
  "message": "I'm interested in your bagasse plates for my restaurant."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Your message has been sent successfully. We'll get back to you within 24 hours."
}
```

## 📊 Error Handling

### Error Response Format
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ]
  }
}
```

### Common Error Codes
- `VALIDATION_ERROR` (400): Invalid input data
- `UNAUTHORIZED` (401): Authentication required
- `FORBIDDEN` (403): Insufficient permissions
- `NOT_FOUND` (404): Resource not found
- `RATE_LIMIT_EXCEEDED` (429): Too many requests
- `INTERNAL_ERROR` (500): Server error

## 🔧 SDKs & Libraries

### JavaScript/Node.js
```bash
npm install @sugarwares/api-client
```

```javascript
import { SugarwaresAPI } from '@sugarwares/api-client';

const api = new SugarwaresAPI('YOUR_API_KEY');

// Get products
const products = await api.products.getAll({
  category: 'plates',
  limit: 20
});

// Create order
const order = await api.orders.create({
  customer: { name: 'John Doe', email: 'john@example.com' },
  items: [{ product_id: 'prod_001', quantity: 100 }]
});
```

### Python
```bash
pip install sugarwares-api
```

```python
from sugarwares_api import SugarwaresAPI

api = SugarwaresAPI('YOUR_API_KEY')

# Get products
products = api.products.get_all(category='plates', limit=20)

# Create order
order = api.orders.create(
    customer={'name': 'John Doe', 'email': 'john@example.com'},
    items=[{'product_id': 'prod_001', 'quantity': 100}]
)
```

## 📞 Support

- **API Support**: api-support@sugarwares.com
- **Technical Issues**: tech-support@sugarwares.com
- **Documentation**: docs@sugarwares.com

## 🔄 Changelog

### Version 1.0.0 (Current)
- Initial API release
- Product catalog endpoints
- Order management
- Contact form submission

### Version 1.1.0 (Planned)
- User authentication
- Shopping cart functionality
- Payment processing
- Order tracking

---

**Last Updated**: January 15, 2024
**API Version**: 1.0.0

