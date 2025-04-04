# Product Catalog API

## Overview
The Product Catalog API is a RESTful service built using Node.js and Express.js to manage phones for an e-commerce platform. It provides functionality for creating, reading, updating, and deleting phones, organizing them into categories, searching and filtering, handling inventory, and tracking pricing and discounts.
## Project Structure


```text
product-catalog-api/
├── .env
├── .gitignore
├── README.md
├── package.json
├── package-lock.json
├── server.js
├── config/
│   └── database.js
├── controllers/
│   ├── categoryController.js
│   ├── productController.js
│   ├── userController.js
    |__inventoryController.js
├── models/
│   ├── category.js
│   ├── product.js
│   ├── user.js
├── routes/
│   ├── categoryRoutes.js
│   ├── productRoutes.js
│   ├── userRoutes.js
    |__inventoryRoutes.js
├── middlewares/
│   ├── authMiddleware.js
│   └── errorMiddleware.js
    |__validateMiddleware.js

└── utils/
    └── validation.js

## Features
- CRUD operations for phones and categories
- Phone search and filtering
- Phone variants (sizes, colors, etc.)
- Inventory tracking
- Pricing and discount support
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
   git clone https://github.com/dorcusmalony/Product_Catalog_API.git
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


### Product Management
| Method | Endpoint          | Description                      |
|--------|------------------|----------------------------------|
| POST   | `/api/products`      | Create a new product            |
| GET    | `/api/products`      | Retrieve all products           |
| GET    | `/api/products/:id`  | Retrieve a specific product     |
| PUT    | `/api/products/:id`  | Update a product                |
| DELETE | `/api/products/:id`  | Delete a product                |

### Category Management
| Method | Endpoint         | Description                      |
|--------|-----------------|----------------------------------|
| POST   | `/api/categories`   | Create a new category           |
| GET    | `/api/categories`   | Retrieve all categories         |
| GET    | `/api/categories/:id` | Retrieve a specific category   |
| PUT    | `/api/categories/:id` | Update a category              |
| DELETE | `/api/categories/:id` | Delete a category              |

### Product Search & Filtering
| Method | Endpoint          | Description                              |
|--------|------------------|------------------------------------------|
| GET    | `/api/products/search` | Search products by name/description/category/price range |

### Inventory Management
| Method | Endpoint              | Description                              |
|--------|----------------------|------------------------------------------|
| GET    | `/api/inventory/low-stock` | Retrieve products with low stock       |
| PUT    | `/api/inventory/:id`      | Update inventory quantity              |

## Example Requests & Responses

### Create a product
**Request:**
```sh
POST /product
Content-Type: application/json
{
  "name": "iPhone 14",
  "description": "Latest Apple iPhone",
  "price": 1200,
  "category": "electronics",
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

### Retrieve All Product
**Request:**
```sh
GET /product
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

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request.
   
