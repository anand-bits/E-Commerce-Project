# E-Commerce Project Backend
h
This repository contains the backend code for an E-commerce project, providing a comprehensive set of APIs to manage users, products, categories, brands, colors, reviews, orders, and coupons. The project includes user authentication with JWT tokens, payment integration with Stripe, and confirmation via webhook after applying discounts to the payment.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [API Documentation](#api-documentation)
- [Authentication](#authentication)
- [Payment Integration](#payment-integration)
- [Webhook Confirmation](#webhook-confirmation)
- [Postman Documentation](#postman-documentation)
- [HTML File](#html-file)
- [Contributing](#contributing)
- [License](#license)

## Features

### Users
- **Register:** Allows users to create an account.
- **Login:** Enables users to log in and receive JWT tokens for authentication.
- **User Profile:** Provides endpoints to view and update user profiles.
- **Update Shipping Address:** Allows users to update their shipping address.

### Products
- **Create Product:** Enables the addition of new products.
- **Product List:** Retrieves a list of all products.
- **Single Product By ID:** Retrieves details of a specific product.
- **Update Product By ID:** Allows for the modification of product details.
- **Delete Product By ID:** Removes a product from the system.

### Categories
- **Create Categories:** Adds new product categories.
- **Get All Categories:** Retrieves a list of all product categories.
- **Get Category By ID:** Retrieves details of a specific category.
- **Update Category By ID:** Allows for the modification of category details.
- **Delete Category By ID:** Removes a category from the system.

### Brands
- **Create Brand:** Adds new product brands.
- **Get All Brands:** Retrieves a list of all product brands.
- **Get Brand By ID:** Retrieves details of a specific brand.
- **Update Brand By ID:** Allows for the modification of brand details.
- **Delete Brand By ID:** Removes a brand from the system.

### Colors
- **Create Color:** Adds new product colors.
- **Get All Colors:** Retrieves a list of all product colors.
- **Get Color By ID:** Retrieves details of a specific color.
- **Update Color By ID:** Allows for the modification of color details.
- **Delete Color By ID:** Removes a color from the system.

### Reviews
- **Create Review:** Allows users to add reviews for products.

### Orders
- **Create Order:** Enables users to place orders.
- **Get All Orders:** Retrieves a list of all orders.
- **Get Order Sum:** Calculates the total sum of an order.
- **Get Order By ID:** Retrieves details of a specific order.
- **Update Order By ID:** Allows for the modification of order details.

### Coupons
- **Create Coupon:** Adds new discount coupons.
- **Get All Coupons:** Retrieves a list of all discount coupons.
- **Get Coupon By ID:** Retrieves details of a specific coupon.
- **Update Coupon By ID:** Allows for the modification of coupon details.

## Prerequisites

Before getting started, make sure you have the following installed:

- Node.js
- npm (Node Package Manager)
- MongoDB

## API Documentation

Refer to the [API Documentation](docs/api.md) for details on each API endpoint, request, and response.

## Authentication

User authentication is implemented using JWT tokens. Include the token in the `Authorization` header of your requests


## Payment Integration

Payment is handled through the Stripe API. Use the `STRIPE_API_KEY` in the environment variables and refer to the [Stripe Documentation](https://stripe.com/docs) for integration details.

## Webhook Confirmation

After payment, the system confirms transactions using a webhook. Set up a webhook endpoint in your Stripe account and use the provided secret key (`WEBHOOK_SECRET`) in the environment variables.

## Postman Documentation

Explore the API endpoints using [Postman Documentation](https://documenter.getpostman.com/view/26931476/2s9YeBdszf).

## HTML File

An `index.html` file is included in the repository. This HTML file can be used for testing or as a starting point for a front-end implementation.

## Contributing

Contributions are welcome! If you want to contribute to this project, please follow the [Contribution Guidelines](CONTRIBUTING.md) before submitting pull requests.

## License

This project is licensed under the [MIT License](LICENSE). Feel free to use, modify, and distribute it as per the terms of the license.

