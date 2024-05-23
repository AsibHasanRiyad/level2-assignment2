# Order Management System

### Prerequisites

- Node.js
- npm

### Installation

1. Open your terminal and Clone the git repository
   ```sh
   git clone https://github.com/your-repository.git
   cd your-repository
   ```

````

2. Install all dependencies:

   ```sh
   npm install
   ```

3. Create a `.env` file in the root directory if it does not already exist and add the following code:

   ```env
   PORT=3000
   DB_URL=mongodb+srv://e-commerce-product:TS9xRUU15UIf0eFm@cluster0.2x6r8lz.mongodb.net/order-management?retryWrites=true&w=majority&appName=Cluster0
   ```

### Running the Application

Start the server:

```sh
npm start:dev
```

The server should now be running on `http://localhost:3000`.

## API Routes

### Products

#### Create Product

```http
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
```

#### Get All Products

```http
GET http://localhost:3000/api/products
```

#### Search Products

Example with query parameters:

```http
GET http://localhost:3000/api/products?category=Electronics&tags=apple
```

#### Get Single Product by ID

```http
GET http://localhost:3000/api/products/{{productId}}
```

#### Update Single Product by ID

```http
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
```

#### Delete Product by ID

```http
DELETE http://localhost:3000/api/products/{{productId}}
```

### Orders

#### Create Order

```http
POST http://localhost:3000/api/orders
Content-Type: application/json

{
  "email": "test@example.com",
  "productId": "60c72b2f5f1b2c001c8e4f2b", // Replace with a valid product ID from your database
  "price": 999,
  "quantity": 2
}
```

#### Get All Orders

```http
GET http://localhost:3000/api/orders
```

#### Get Orders by Email

```http
GET http://localhost:3000/api/orders?email=test@example.com
```

## Error Handling

In case a route is not found, the server will respond with:

```json
{
  "success": false,
  "message": "Route not found"
}
```

## Root Route

To check if the server is running, visit `http://localhost:3000/` and you should see:

```
Welcome to Order Management!
```

```

Make sure to replace placeholders like `https://github.com/your-repository.git` with your actual repository URL.
```
````
