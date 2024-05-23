- Instructions on how to run the application locally

1. Clone the git repository and Open your code terminal
2. Run "npm i" to install all the dependency
3. Create a .env file and paste the code below if .env file is not available

- Sample .env code
  PORT = 3000
  DB_URL = mongodb+srv://e-commerce-product:TS9xRUU15UIf0eFm@cluster0.2x6r8lz.mongodb.net/order-management?retryWrites=true&w=majority&appName=Cluster0

- Routes

### Create Product

POST http://localhost:3000/api/products
Content-Type: application/json

{
"name": "iPhone 13 Pro",
"description": "A sleek and powerful smartphone with cutting-edge features.",
"price": 999,
"category": "Electronics",
"tags": ["smartphone", "apple", "electronics"],
"variants": [
{ "type": "color", "value": "silver" },
{ "type": "storage", "value": "256GB" }
],
"inventory": {
"quantity": 50,
"inStock": true
}
}

### Get All Products

GET http://localhost:3000/api/products

### Search Products (example with query parameters)

GET http://localhost:3000/api/products?category=Electronics&tags=apple

### Get Single Product by ID

GET http://localhost:3000/api/products/{{productId}}

### Update Single Product by ID

PUT http://localhost:3000/api/products/{{productId}}
Content-Type: application/json

{
"name": "iPhone 13 Pro Max",
"description": "An even more powerful and sleek smartphone.",
"price": 1099,
"category": "Electronics",
"tags": ["smartphone", "apple", "electronics"],
"variants": [
{ "type": "color", "value": "gold" },
{ "type": "storage", "value": "512GB" }
],
"inventory": {
"quantity": 30,
"inStock": true
}
}

### Delete Product by ID

DELETE http://localhost:3000/api/products/{{productId}}

### Create Order

POST http://localhost:3000/api/orders
Content-Type: application/json

{
"email": "test@example.com",
"productId": "60c72b2f5f1b2c001c8e4f2b", // Replace with a valid product ID from your database
"price": 999,
"quantity": 2
}

### Get All Orders

GET http://localhost:3000/api/orders

### Get Orders by Email

GET http://localhost:3000/api/orders?email=test@example.com
