# Product_Catalog_API


This is a RESTful API for a *Product Catalog System. It allows users to **create, read, update, and delete* products, organize them into *categories, and perform **search and filtering* operations.



## 📌 Features

- 📦 *CRUD operations* for products
- 🗂 *Categorization* of products
- 🔍 *Search & Filtering* (by name, description, category)
- 🏷 *Product Variants* (e.g., different sizes, colors)
- 📊 *Inventory Tracking*
- 💰 *Pricing & Discounts*
- 🔒 *Error Handling & Input Validation*
- 📜 *Well-structured API documentation*

---

## 🚀 Setup & Installation

### 1️⃣ Prerequisites
Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [MongoDB](https://www.mongodb.com/) (local or cloud)
- [Postman](https://www.postman.com/) (optional, for API testing)

### 2️⃣ Clone the Repository
```sh
git clone https://github.com/your-username/product-catalog-api.git
cd product-catalog-api
### 3️⃣ Install Dependencies
npm install
4️⃣ Configure Environment Variables
Create a .env file in the root directory and add:

env

PORT=3000
MONGO_URI=your_mongodb_connection_string
5️⃣ Start the Server
sh

npm start
The API will run on:
📍 http://localhost:3000/

📌 API Documentation
📦 Product Endpoints
🔹 Get All Products
http

GET /api/products
📥 Request Example:

sh

curl -X GET http://localhost:3000/api/products
📤 Response Example:

json

[
  {
    "_id": "652cfdab9a6c123456789012",
    "name": "Gaming Laptop",
    "description": "High-performance laptop for gaming",
    "price": 1500,
    "category": "Electronics",
    "inventory": 10
  }
]
🔹 Get a Single Product
http

GET /api/products/:id
📥 Request Example:

sh

curl -X GET http://localhost:3000/api/products/652cfdab9a6c123456789012
📤 Response Example:

json

{
  "_id": "652cfdab9a6c123456789012",
  "name": "Gaming Laptop",
  "description": "High-performance laptop for gaming",
  "price": 1500,
  "category": "Electronics",
  "inventory": 10
}
🔹 Create a Product
http

POST /api/products
📥 Request Body (JSON):

json

{
  "name": "Ultrabook Laptop",
  "description": "Lightweight and powerful laptop",
  "price": 1200,
  "category": "Electronics",
  "inventory": 5
}
📤 Response Example:

json

{
  "_id": "652d01eb9a6c123456789013",
  "name": "Ultrabook Laptop",
  "description": "Lightweight and powerful laptop",
  "price": 1200,
  "category": "Electronics",
  "inventory": 5
}
🔹 Update a Product
http

PUT /api/products/:id
📥 Request Body (JSON):

json

{
  "price": 1100,
  "inventory": 8
}
📤 Response Example:

json

{
  "_id": "652d01eb9a6c123456789013",
  "name": "Ultrabook Laptop",
  "description": "Lightweight and powerful laptop",
  "price": 1100,
  "category": "Electronics",
  "inventory": 8
}
🔹 Delete a Product
http

DELETE /api/products/:id
📤 Response Example:

json

{
  "message": "Product deleted successfully"
}
🗂 Category Endpoints
🔹 Get All Categories
http

GET /api/categories
🔹 Add a New Category
http

POST /api/categories
📥 Request Body:

json

{
  "name": "Gaming Laptops"
}
🔹 Delete a Category
http

DELETE /api/categories/:id
🚨 Assumptions & Limitations
Database: Uses MongoDB (ensure MongoDB is running).

Product Model:

name: Required, string

description: Required, string

price: Required, number

category: Required, string

inventory: Required, number

Error Handling:

Returns 400 for invalid input.

Returns 404 if product not found.

Authentication: working on it but not yet implemented (can be added with JWT).



🚀 Future Enhancements
✅ User authentication & role-based access
✅ Pagination & sorting for large datasets
✅ Advanced search & filtering
✅ Payment gateway integration
