# Sequelize Database Project

This project showcases the usage of Sequelize ORM (Object-Relational Mapping) with a MySQL database. It provides models for managing products, suppliers, orders, customers, and inventory.

## Getting Started

To get started with this project, follow these steps:

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js
- MySQL

### Installation

1. Clone the repository:

    ```bash
    git clone <repository-url>
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up your environment variables:

    Create a `.env` file in the root directory of the project and define the following variables:

    ```dotenv
    DB_HOST=<your-database-host>
    DB_USER=<your-database-username>
    DB_PASSWORD=<your-database-password>
    DB_NAME=<your-database-name>
    ```

4. Run the application:

    ```bash
    npm start
    ```

## Database Structure

The database schema consists of the following tables:

- `Product`: Stores information about products.
- `Supplier`: Stores information about suppliers.
- `Order`: Stores information about orders placed by customers.
- `OrderItems`: Stores the items included in each order.
- `Customer`: Stores information about customers.
- `Inventory`: Stores inventory information for products.

## Models

- `Product`: Represents a product, with attributes like name, description, price, and image path.
- `Supplier`: Represents a supplier, with attributes like name, phone, and email.
- `Order`: Represents an order placed by a customer, with attributes like order date, status, and total quantity.
- `OrderItems`: Represents the items included in an order, with attributes like quantity.
- `Customer`: Represents a customer, with attributes like name, email, and phone.
- `Inventory`: Represents the inventory of products, with attributes like quantity.

## Usage

You can use the provided Sequelize models to interact with the database. For example:

```javascript
const { Product, Supplier, Order, OrderItems, Customer, Inventory } = require('./models');

// Example: Create a new product
Product.create({
    Name: 'Sample Product',
    Description: 'This is a sample product.',
    Price: 10.99,
    ImagePath: '/images/sample-product.jpg'
}).then(product => {
    console.log('Product created:', product.toJSON());
}).catch(error => {
    console.error('Error creating product:', error);
});
