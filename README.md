# Product Catalog API

## Overview
The Product Catalog API is a RESTful service built using Node.js and Express.js to manage phones for an e-commerce platform. It provides functionality for creating, reading, updating, and deleting phones, organizing them into categories, searching and filtering, handling inventory, tracking pricing and discounts, and generating basic reports.

## Features
- CRUD operations for phones and categories
- Phone search and filtering
- Phone variants (sizes, colors, etc.)
- Inventory tracking
- Pricing and discount support
- Basic reporting (e.g., low stock items, best-selling phones)
- Error handling and input validation

## Technologies Used
- Node.js
- Express.js
- MongoDB (Mongoose ORM)
- dotenv (for environment variables)
- Joi (for input validation)
- Postman (for testing)

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/product-catalog-api.git
   ```
2. Navigate to the project directory:
   ```sh
   cd product-catalog-api
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Set up environment variables:
   - Create a `.env` file in the root directory
   - Add the following variables:
     ```env
     PORT=5000
     MONGO_URI=mongodb+srv://your-mongodb-url
     ```
5. Start the server:
   ```sh
   npm start
   ```

## API Endpoints

### Phone Management
| Method | Endpoint          | Description                      |
|--------|------------------|----------------------------------|
| POST   | `/phones`      | Create a new phone            |
| GET    | `/phones`      | Retrieve all phones           |
| GET    | `/phones/:id`  | Retrieve a specific phone     |
| PUT    | `/phones/:id`  | Update a phone                |
| DELETE | `/phones/:id`  | Delete a phone                |

### Category Management
| Method | Endpoint         | Description                      |
|--------|-----------------|----------------------------------|
| POST   | `/categories`   | Create a new category           |
| GET    | `/categories`   | Retrieve all categories         |
| GET    | `/categories/:id` | Retrieve a specific category   |
| PUT    | `/categories/:id` | Update a category              |
| DELETE | `/categories/:id` | Delete a category              |

### Phone Search & Filtering
| Method | Endpoint          | Description                              |
|--------|------------------|------------------------------------------|
| GET    | `/phones/search?query=value` | Search phones by name/description |
| GET    | `/phones?category=value`     | Filter phones by category         |
| GET    | `/phones?minPrice=10&maxPrice=100` | Filter by price range |

### Inventory Management
| Method | Endpoint              | Description                              |
|--------|----------------------|------------------------------------------|
| GET    | `/inventory/low-stock` | Retrieve phones with low stock       |
| PUT    | `/inventory/:id`      | Update inventory quantity              |

### Reporting
| Method | Endpoint                 | Description                              |
|--------|-------------------------|------------------------------------------|
| GET    | `/reports/low-stock`     | Retrieve phones with low stock          |
| GET    | `/reports/best-selling`  | Retrieve best-selling phones            |
| GET    | `/reports/recently-added` | Retrieve recently added phones         |

## Example Requests & Responses

### Create a Phone
**Request:**
```sh
POST /phones
Content-Type: application/json
{
  "name": "iPhone 14",
  "description": "Latest Apple iPhone",
  "price": 1200,
  "category": "Smartphones",
  "variants": [{"color": "Black", "size": "128GB"}],
  "stock": 10
}
```

**Response:**
```sh
201 Created
{
  "id": "60af4adbe72b4a3d12345678",
  "name": "iPhone 14",
  "description": "Latest Apple iPhone",
  "price": 1200,
  "category": "Smartphones",
  "variants": [{"color": "Black", "size": "128GB"}],
  "stock": 10
}
```

### Retrieve All Phones
**Request:**
```sh
GET /phones
```

**Response:**
```sh
200 OK
[
  {
    "id": "60af4adbe72b4a3d12345678",
    "name": "iPhone 14",
    "description": "Latest Apple iPhone",
    "price": 1200,
    "category": "Smartphones",
    "variants": [{"color": "Black", "size": "128GB"}],
    "stock": 10
  }
]
```

## Error Handling
- `400 Bad Request` for invalid inputs
- `404 Not Found` if a resource does not exist
- `500 Internal Server Error` for server issues

## Testing
You can test the API using:
- [Postman](https://www.postman.com/)
- cURL commands in the terminal
- VS Code REST Client extension

## Assumptions & Limitations
- This API assumes a MongoDB database connection.
- No authentication or user roles are implemented (can be extended later).
- Pricing does not support complex discount structures (only basic discounts).

## Future Improvements
- Implement user authentication with JWT
- Add caching for faster responses
- Extend filtering with more parameters
- Implement pagination for large phone lists



   


  
