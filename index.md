
# nodejs-ecommerce-api

API for Online shopping Cart----

Basically running On render but maybe suspended due to Charge..

So this Document is created while running the server by base Address:- [https://online-shopping-api-qca9.onrender.com/api/v1](https://online-shopping-api-qca9.onrender.com/api/v1)

if wana test mail me :- h20220277@pilani.bits-pilani.ac.in

<!--- If we have only one group/collection, then no need for the "ungrouped" heading -->



## Endpoints

* [Users](#users)
    1. [Register](#1-register)
    1. [Login](#2-login)
    1. [User profile](#3-user-profile)
    1. [Update Shipping Address](#4-update-shipping-address)
* [Products](#products)
    1. [Create Product](#1-create-product)
    1. [Product List](#2-product-list)
    1. [Single Product By id](#3-single-product-by-id)
    1. [Update Product by Id](#4-update-product-by-id)
    1. [Delete the product with ID](#5-delete-the-product-with-id)
* [Categories](#categories)
    1. [Create Categories](#1-create-categories)
    1. [get All Categories](#2-get-all-categories)
    1. [Get Categories by Id](#3-get-categories-by-id)
    1. [Update Category By ID](#4-update-category-by-id)
    1. [Delete the category with ID](#5-delete-the-category-with-id)
* [Brands](#brands)
    1. [Create Brand](#1-create-brand)
    1. [get All Brand](#2-get-all-brand)
    1. [Get Brand by Id](#3-get-brand-by-id)
    1. [Update Brand By ID](#4-update-brand-by-id)
    1. [Delete the brand with ID](#5-delete-the-brand-with-id)
* [Colors](#colors)
    1. [Create](#1-create)
    1. [get](#2-get)
    1. [Get By ID](#3-get-by-id)
    1. [Update By ID](#4-update-by-id)
    1. [Delete By ID](#5-delete-by-id)
* [Review](#review)
    1. [Create](#1-create-1)
* [Order](#order)
    1. [Create](#1-create-2)
    1. [get All Orders](#2-get-all-orders)
    1. [get Order sum](#3-get-order-sum)
    1. [Get By ID](#4-get-by-id)
    1. [Update By ID](#5-update-by-id)
* [Coupons](#coupons)
    1. [Create Coupons](#1-create-coupons)
    1. [get All Coupon](#2-get-all-coupon)
    1. [Get By ID](#3-get-by-id-1)
    1. [Update By ID](#4-update-by-id-1)

--------



## Users

This collection is for User and Admin which is also user



### 1. Register


This API endpoint is used to register a new user. It is an HTTP POST request that should be sent to the `{{baseURL}}/user/register` URL.

### Request Parameters

This endpoint does not require any request parameters.

### Response

Upon successful registration, the API will return a response with a status code of 200. The response body will contain a JSON object with the following properties:

- `success` (boolean): Indicates whether the registration was successful or not. In this case, it will be `true`.
- `message` (string): A message related to the registration process. In this case, it will be an empty string.
    

Please note that this response does not include any specific information about the registered user. Additional API endpoints may be available to retrieve user details or perform other actions related to the registered user.


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{baseURL}}/user/register
```



***Body:***

```js        
{
    "fullname": "Test2",
    "email": "test2@gmail.com",
    "password": "123456"
}
```



### 2. Login



This endpoint is used to log in a user. It sends an HTTP POST request to the `{{baseURL}}/user/login` URL.

The request should include the following parameters in the request body:
- `email` (string): The email address of the user.
- `password` (string): The password of the user.

The response returned by the server will have a status code of 200 if the login is successful. The response body will contain the following properties:
- `success` (boolean): Indicates whether the login was successful or not.
- `message` (string): A message from the server, if any.
- `userFound` (object): An object containing information about the logged-in user. It has the following properties:
  - `_id` (string): The unique identifier of the user.
  - `fullname` (string): The full name of the user.
  - `email` (string): The email address of the user.
  - `password` (string): The password of the user.
  - `orders` (array): An array of the user's orders.
  - `wishLists` (array): An array of the user's wish lists.
  - `isAdmin` (boolean): Indicates whether the user is an admin or not.
  - `hasShippingAddress` (boolean): Indicates whether the user has a shipping address or not.
  - `createdAt` (string): The date and time when the user was created.
  - `updatedAt` (string): The date and time when the user was last updated.
  - `__v` (number): The version number of the user.
- `token` (string): A token that can be used for authentication in subsequent requests.

Please note that the response may not include actual values for the properties mentioned above.

To log in a user, send an HTTP POST request to `{{baseURL}}/user/login` with the required parameters in the request body. The server will respond with the user information and a token for authentication.



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{baseURL}}/user/login
```



***Body:***

```js        
{
    "email":"test2@gmail.com",
    "password":"123456"
}
```



### 3. User profile


This API endpoint is used to retrieve the profile information of a user. It makes an HTTP GET request to the specified URL: `{{baseURL}}/user/profile/`.

The response returned by the last execution of this request had a status code of 200, indicating a successful response. The response body contained the following information:

- `status`: The status of the response.
- `message`: A message associated with the response.
- `user`: An object containing the user's profile information.
    - `shippingAddress`: An object representing the user's shipping address.
        - `address`: The user's address.
        - `city`: The city where the user resides.
        - `postalCode`: The postal code of the user's address.
        - `province`: The province or state where the user resides.
        - `phone`: The user's phone number.
    - `_id`: The unique identifier of the user.
    - `fullname`: The full name of the user.
    - `email`: The email address of the user.
    - `password`: The password of the user.
    - `orders`: An array of objects representing the user's orders.
        - `_id`: The unique identifier of the order.
        - `user`: The user associated with the order.
        - `orderItems`: An array of objects representing the items in the order.
            - `_id`: The unique identifier of the order item.
            - `name`: The name of the order item.
            - `qty`: The quantity of the order item.
            - `price`: The price of the order item.
        - `shippingAddress`: The shipping address associated with the order.
            - `address`: The address for shipping the order.
            - `city`: The city for shipping the order.
            - `postalCode`: The postal code for shipping the order.
            - `province`: The province or state for shipping the order.
            - `phone`: The phone number for shipping the order.
        - `paymentStatus`: The payment status of the order.
        - `paymentMethod`: The payment method used for the order.
        - `totalPrice`: The total price of the order.
        - `currency`: The currency used for the order.
        - `status`: The status of the order.
        - `orderNumber`: The order number.
        - `createdAt`: The date and time when the order was created.
        - `updatedAt`: The date and time when the order was last updated.
        - `__v`: The version of the order.
    - `wishLists`: An array of objects representing the user's wish lists.
    - `isAdmin`: A boolean value indicating whether the user is an admin.
    - `hasShippingAddress`: A boolean value indicating whether the user has a shipping address.
    - `createdAt`: The date and time when the user was created.
    - `updatedAt`: The date and time when the user was last updated.
    - `__v`: The version of the user.

Please note that any specific values (such as names, emails, and addresses) have been omitted from this description for security and privacy reasons.


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{baseURL}}/user/profile
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NWEyOTUyM2Y2YTg2OTVmYWYyYWZlOSIsImlhdCI6MTcwMDQxNTE1MywiZXhwIjoxNzAwNjc0MzUzfQ.x_e5xbO1bIbwFhs0_xIS9Ruj1UJSSxkXkV7UCyMr9pY |  |



### 4. Update Shipping Address


This API endpoint allows you to update the shipping address of a user. It is an HTTP PUT request to `{{baseURL}}/user/update/shipping`.

The request should include the updated shipping address details in the request body. The response will contain the updated user object with the modified shipping address.

### Request Parameters

The request body should include the following parameters:

- `address` (string): The updated shipping address.
- `city` (string): The updated city name.
- `postalCode` (string): The updated postal code.
- `province` (string): The updated province name.
- `phone` (string): The updated phone number.
    

### Response

The API will respond with a JSON object containing the updated user information. The response will have the following properties:

- `status` (string): The status of the request.
- `message` (string): A message regarding the status of the request.
- `user` (object): The updated user object.
    - `shippingAddress` (object): The updated shipping address object.
        - `address` (string): The updated shipping address.
        - `city` (string): The updated city name.
        - `postalCode` (string): The updated postal code.
        - `province` (string): The updated province name.
        - `phone` (string): The updated phone number.
    - `_id` (string): The unique identifier of the user.
    - `fullname` (string): The full name of the user.
    - `email` (string): The email address of the user.
    - `password` (string): The password of the user.
    - `orders` (array): An array of order IDs associated with the user.
    - `wishLists` (array): An array of wish list IDs associated with the user.
    - `isAdmin` (boolean): Indicates whether the user is an admin or not.
    - `hasShippingAddress` (boolean): Indicates whether the user has a shipping address or not.
    - `createdAt` (string): The timestamp of when the user was created.
    - `updatedAt` (string): The timestamp of when the user was last updated.
    - `__v` (number): The version of the user object.

Please note that the response may not include all the properties mentioned above if they were not modified during the update.


***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{baseURL}}/user/update/shipping
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NWEyOTUyM2Y2YTg2OTVmYWYyYWZlOSIsImlhdCI6MTcwMDQxNTE1MywiZXhwIjoxNzAwNjc0MzUzfQ.x_e5xbO1bIbwFhs0_xIS9Ruj1UJSSxkXkV7UCyMr9pY |  |



***Body:***

```js        
{
    "fullName"
}
```



## Products



### 1. Create Product



This API endpoint is used to create a new product. It sends an HTTP POST request to the URL `{{baseURL}}/product/createproduct`.

The request should include the following parameters:

- `name` (string): The name of the product.
- `description` (string): The description of the product.
- `brand` (string): The brand of the product.
- `category` (string): The category of the product.
- `sizes` (array of strings): The available sizes of the product.
- `colors` (array of strings): The available colors of the product.
- `user` (string): The user who created the product.
- `images` (array of strings): The URLs of the images of the product.
- `reviews` (array): An array of reviews for the product.
- `price` (number): The price of the product.
- `totalQty` (number): The total quantity of the product.
- `totalSold` (number): The total number of units sold of the product.

The response will have the following properties:

- `status` (string): The status of the response.
- `message` (string): A message related to the response.
- `product` (object): An object representing the created product.
  - `name` (string): The name of the product.
  - `description` (string): The description of the product.
  - `brand` (string): The brand of the product.
  - `category` (string): The category of the product.
  - `sizes` (array of strings): The available sizes of the product.
  - `colors` (array of strings): The available colors of the product.
  - `user` (string): The user who created the product.
  - `images` (array of strings): The URLs of the images of the product.
  - `reviews` (array): An array of reviews for the product.
  - `price` (number): The price of the product.
  - `totalQty` (number): The total quantity of the product.
  - `totalSold` (number): The total number of units sold of the product.
  - `_id` (string): The unique identifier of the product.
  - `createdAt` (string): The timestamp when the product was created.
  - `updatedAt` (string): The timestamp when the product was last updated.
  - `__v` (number): The version of the product.
  - `qtyLeft` (number): The quantity of the product left in stock.
  - `totalReviews` (number): The total number of reviews for the product.
  - `averageRating` (string): The average rating of the product.
  - `id` (string): The unique identifier of the product.

Please note that the values for some properties are empty strings or zero in the example response. These values will be populated with actual data when a product is created.

The last execution of this request returned a response with a status code of 201, indicating that the product was successfully created.

If you have any further questions or need assistance, please let me know.



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{baseURL}}/product/createproduct
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NWEyOTUyM2Y2YTg2OTVmYWYyYWZlOSIsImlhdCI6MTcwMDQwNzk2NCwiZXhwIjoxNzAwNjY3MTY0fQ.m1VpipaawfG6oWPGO_TM48OCEAsMOp-wTf49pOIGRpI |  |



***Body:***

```js        
{
    "name":"Skirt7",
    "description":"Skirt For the girl",
    "category":"women",
    "sizes":"XL",
    "colors":"yellow",
    "price":4569,
    "totalQty":"2",
    "brand":"adidas"
}
```



### 2. Product List


This API endpoint is used to retrieve a list of products. It sends an HTTP GET request to the specified URL: `{{baseURL}}/product/getproducts`.

The last execution of this request returned a response with a status code of 200, indicating a successful request. The response body contained the following information:

- `success`: a boolean value indicating the success of the request.
- `results`: the number of results returned in the response.
- `pagination`: an object containing pagination information.
- `message`: a message related to the request.
- `product`: an array of product objects, each containing the following properties:
    - `_id`: the unique identifier of the product.
    - `name`: the name of the product.
    - `description`: a description of the product.
    - `brand`: the brand of the product.
    - `category`: the category of the product.
    - `sizes`: an array of available sizes for the product.
    - `colors`: an array of available colors for the product.
    - `user`: the user associated with the product.
    - `images`: an array of image URLs associated with the product.
    - `reviews`: an array of review objects, each containing the following properties:
        - `_id`: the unique identifier of the review.
        - `user`: the user who wrote the review.
        - `product`: the product the review is for.
        - `message`: the content of the review.
        - `rating`: the rating given by the user.
        - `createdAt`: the timestamp of when the review was created.
        - `updatedAt`: the timestamp of when the review was last updated.
        - `__v`: the version of the review object.
    - `price`: the price of the product.
    - `totalQty`: the total quantity of the product.
    - `totalSold`: the total quantity of the product sold.
    - `createdAt`: the timestamp of when the product was created.
    - `updatedAt`: the timestamp of when the product was last updated.
    - `__v`: the version of the product object.
    - `qtyLeft`: the quantity of the product remaining.
    - `totalReviews`: the total number of reviews for the product.
    - `averageRating`: the average rating of the product.
    - `id`: the ID of the product.

Please note that specific values such as names, emails, and timestamps have been excluded from this description for security and privacy reasons.

To use this API endpoint, send an HTTP GET request to `{{baseURL}}/product/getproducts`. The response will contain a list of products along with their associated information.


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{baseURL}}/product/getproducts
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NWEyOTUyM2Y2YTg2OTVmYWYyYWZlOSIsImlhdCI6MTcwMDQxNTIyMywiZXhwIjoxNzAwNjc0NDIzfQ.4St-7_LXXlpqhuj7LS8p76qfl4PdfUPkjuYfXW_7rOE |  |



### 3. Single Product By id


This endpoint is used to retrieve a specific product by its ID. The product ID is provided as a parameter in the URL.

To retrieve a product, send an HTTP GET request to `{{baseURL}}/product/getproduct/{productId}` where `{productId}` is the unique identifier of the product.

The response will contain information about the product, including its name, description, brand, category, available sizes and colors, price, quantity, and other details.

Here is an example response for a successful request:

``` json
{
  "success": true,
  "message": "",
  "product": {
    "_id": "655d19ed72ce1149dbb0e740",
    "name": "Example Product",
    "description": "This is an example product.",
    "brand": "Example Brand",
    "category": "Example Category",
    "sizes": ["S", "M", "L"],
    "colors": ["Red", "Blue", "Green"],
    "user": "example_user",
    "images": ["image1.jpg", "image2.jpg"],
    "reviews": [
      {
        "_id": "review_id",
        "user": "review_user",
        "product": "655d19ed72ce1149dbb0e740",
        "message": "This product is great!",
        "rating": 5,
        "createdAt": "2021-01-01T00:00:00.000Z",
        "updatedAt": "2021-01-01T00:00:00.000Z",
        "__v": 0
      }
    ],
    "price": 9.99,
    "totalQty": 100,
    "totalSold": 50,
    "createdAt": "2021-01-01T00:00:00.000Z",
    "updatedAt": "2021-01-01T00:00:00.000Z",
    "__v": 0,
    "qtyLeft": 50,
    "totalReviews": 1,
    "averageRating": 5,
    "id": "655d19ed72ce1149dbb0e740"
  }
}

 ```

Please note that the actual values in the response may vary.

The `success` field indicates whether the request was successful or not. If `success` is `true`, the product was found and the information is provided in the `product` field. If `success` is `false`, an error message may be included in the `message` field.

If the product has any reviews, they will be included in the `reviews` array. Each review object contains information about the user who left the review, the message, rating, and timestamps.

Feel free to explore the other fields in the response to get more details about the product.


***Endpoint:***

```bash
Method: GET
Type: RAW
URL: {{baseURL}}/product/getproduct/6559e9a9be442a21b6c692c8
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NWEyOTUyM2Y2YTg2OTVmYWYyYWZlOSIsImlhdCI6MTcwMDQxNTIyMywiZXhwIjoxNzAwNjc0NDIzfQ.4St-7_LXXlpqhuj7LS8p76qfl4PdfUPkjuYfXW_7rOE |  |



***Body:***

```js        
{
    "brand":"puma"
}
```



### 4. Update Product by Id


This endpoint is used to update a product with the given ID. The ID of the product to be updated is included in the URL as a path parameter.

To update a product, send an HTTP PUT request to `{{baseURL}}/product/updateproduct/{productId}` where `{productId}` is the ID of the product to be updated.

The request should include the updated information for the product in the request body. The request body should be in JSON format and include the following properties:

- `name` (string): The name of the product.
- `description` (string): The description of the product.
- `brand` (string): The brand of the product.
- `category` (string): The category of the product.
- `sizes` (array of strings): The available sizes of the product.
- `colors` (array of strings): The available colors of the product.
- `user` (string): The user who updated the product.
- `images` (array): The images of the product.
- `reviews` (array): The reviews of the product.
- `price` (number): The price of the product.
- `totalQty` (number): The total quantity of the product.
- `totalSold` (number): The total number of the product sold.
- `createdAt` (string): The date and time when the product was created.
- `updatedAt` (string): The date and time when the product was last updated.
- `__v` (number): The version of the product.
- `qtyLeft` (number): The quantity of the product left.
- `totalReviews` (number): The total number of reviews for the product.
- `averageRating` (string): The average rating of the product.
- `id` (string): The ID of the product.
    

The response will have a status code of 200 if the product update is successful. The response body will be in JSON format and will include the following properties:

- `success` (boolean): Indicates whether the product update was successful or not.
- `message` (string): A message providing additional information about the product update.
- `product` (object): An object representing the updated product. The properties of the product object will be the same as the request body properties described above.
    

Please note that the values for the properties in the response example are placeholders and may not reflect the actual values returned by the API.


***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{baseURL}}/product/updateproduct/6559e9a9be442a21b6c692c8
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NWEyOTUyM2Y2YTg2OTVmYWYyYWZlOSIsImlhdCI6MTcwMDQxNTIyMywiZXhwIjoxNzAwNjc0NDIzfQ.4St-7_LXXlpqhuj7LS8p76qfl4PdfUPkjuYfXW_7rOE |  |



***Body:***

```js        
{
    "brand":"puma"
}
```



### 5. Delete the product with ID



***Endpoint:***

```bash
Method: DELETE
Type: 
URL: {{baseURL}}/product/deleteproduct/6559e9a9be442a21b6c692c8
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NWEyOTUyM2Y2YTg2OTVmYWYyYWZlOSIsImlhdCI6MTcwMDQxNTIyMywiZXhwIjoxNzAwNjc0NDIzfQ.4St-7_LXXlpqhuj7LS8p76qfl4PdfUPkjuYfXW_7rOE |  |



## Categories



### 1. Create Categories


This API endpoint is used to create a new category. It sends an HTTP POST request to the URL `{{baseURL}}/category/createcategory`.

The request should include the following parameters:

- `name` (string): The name of the category.
- `user` (string): The user associated with the category.
- `image` (string): The URL of the image associated with the category.
- `products` (array): An array of product IDs that belong to the category.
    

The response from the API will have a status code of 200 if the request is successful. The response body will contain the following properties:

- `status` (string): The status of the response.
- `message` (string): A message associated with the response.
- `category` (object): An object representing the created category.
    - `name` (string): The name of the category.
    - `user` (string): The user associated with the category.
    - `image` (string): The URL of the image associated with the category.
    - `products` (array): An array of product IDs that belong to the category.
    - `_id` (string): The unique identifier of the category.
    - `createdAt` (string): The timestamp of when the category was created.
    - `updatedAt` (string): The timestamp of when the category was last updated.
    - `__v` (number): The version number of the category.

Please note that the actual values for `name`, `user`, `image`, `products`, `_id`, `createdAt`, `updatedAt`, and `__v` will be specific to the created category and may vary in each response.


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{baseURL}}/category/createcategory
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NWEyOTUyM2Y2YTg2OTVmYWYyYWZlOSIsImlhdCI6MTcwMDQwNzk2NCwiZXhwIjoxNzAwNjY3MTY0fQ.m1VpipaawfG6oWPGO_TM48OCEAsMOp-wTf49pOIGRpI |  |



***Body:***

```js        
{
    "name":"men"
}
```



### 2. get All Categories


This API endpoint allows you to retrieve a list of categories.

To retrieve the list of categories, send a GET request to `{{baseURL}}/category/`.

### Request

- Method: GET
- Endpoint: `{{baseURL}}/category/`
    

### Response

The API will respond with a JSON object containing the following properties:

- `status` (string): The status of the response.
- `message` (string): A message associated with the response.
- `categories` (array): An array of category objects. Each category object has the following properties:
    - `_id` (string): The unique identifier of the category.
    - `name` (string): The name of the category.
    - `user` (string): The user associated with the category.
    - `image` (string): The image URL of the category.
    - `products` (array): An array of product IDs associated with the category.
    - `createdAt` (string): The date and time when the category was created.
    - `updatedAt` (string): The date and time when the category was last updated.
    - `__v` (integer): The version of the category object.

Example response:

``` json
{
  "status": "",
  "message": "",
  "categories": [
    {
      "_id": "",
      "name": "",
      "user": "",
      "image": "",
      "products": [""],
      "createdAt": "",
      "updatedAt": "",
      "__v": 0
    }
  ]
}

 ```

Please note that the values for the properties `_id`, `name`, `user`, `image`, `products`, `createdAt`, `updatedAt`, and `__v` will be populated with actual data in the response.


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{baseURL}}/category/
```



### 3. Get Categories by Id


This HTTP GET request is used to retrieve information about a specific category. The request should be made to the endpoint `{{baseURL}}/category/655a89860494bbfb6a8aaffd`, where `655a89860494bbfb6a8aaffd` is the unique identifier of the category.

### Response

The response to this request will have a status code of 200, indicating a successful request. The response body will contain the following properties:

- `status`: A string indicating the status of the request.
- `message`: A string providing additional information about the request.
- `category`: The details of the category. In this case, the value is null, indicating that no category was found with the given identifier.
    

Please note that the response may vary depending on the specific category identifier used in the request.


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{baseURL}}/category/655a89860494bbfb6a8aaffd
```



### 4. Update Category By ID


This API endpoint is used to update a specific category identified by its unique ID. The ID of the category to be updated is passed as a path parameter in the URL.

To update a category, send an HTTP PUT request to `{{baseURL}}/category/{categoryID}` where `{categoryID}` is the ID of the category to be updated.

The request should include the updated details of the category in the request body. The request body should be in JSON format and should contain the following properties:

- `name` (string): The updated name of the category.
- `user` (string): The updated user associated with the category.
- `image` (string): The updated image URL of the category.
- `products` (array): An array of product IDs associated with the category.
    

The response to the request will contain the updated category object. The response body will be in JSON format and will include the following properties:

- `_id` (string): The unique ID of the category.
- `name` (string): The updated name of the category.
- `user` (string): The updated user associated with the category.
- `image` (string): The updated image URL of the category.
- `products` (array): An array of product IDs associated with the category.
- `createdAt` (string): The timestamp of when the category was created.
- `updatedAt` (string): The timestamp of when the category was last updated.
- `__v` (number): The version of the category object.
    

Please note that the response status will be 200 if the category is successfully updated.

If there are any errors or issues with the request, the response will include an appropriate error message in the `message` property.


***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{baseURL}}/category/655a89860494bbfb6a8aaffd
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NWEyOTUyM2Y2YTg2OTVmYWYyYWZlOSIsImlhdCI6MTcwMDQxNTIyMywiZXhwIjoxNzAwNjc0NDIzfQ.4St-7_LXXlpqhuj7LS8p76qfl4PdfUPkjuYfXW_7rOE |  |



***Body:***

```js        
{
    "name":"Women"
}
```



### 5. Delete the category with ID



***Endpoint:***

```bash
Method: DELETE
Type: 
URL: {{baseURL}}/product/deleteproduct/6559e9a9be442a21b6c692c8
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NWEyOTUyM2Y2YTg2OTVmYWYyYWZlOSIsImlhdCI6MTcwMDQxNTIyMywiZXhwIjoxNzAwNjc0NDIzfQ.4St-7_LXXlpqhuj7LS8p76qfl4PdfUPkjuYfXW_7rOE |  |



## Brands



### 1. Create Brand



This API endpoint is used to create a new brand. It sends an HTTP POST request to `{{baseURL}}/brand/createbrand`.

### Request Parameters
The request does not require any specific parameters. However, it is expected to include the following information in the request body:
- `name`: The name of the brand.
- `user`: The user associated with the brand.
- `products`: An array of products associated with the brand.

### Response
The response received from the server will have a status code of 200. The response body will contain the following fields:
- `status`: The status of the request.
- `message`: A message providing additional information about the request.
- `brand`: An object representing the created brand. It will have the following properties:
  - `name`: The name of the brand.
  - `user`: The user associated with the brand.
  - `products`: An array of products associated with the brand.
  - `_id`: The unique identifier of the brand.
  - `createdAt`: The timestamp of when the brand was created.
  - `updatedAt`: The timestamp of when the brand was last updated.
  - `__v`: The version of the brand.

Please note that the actual values for `name`, `user`, `products`, `_id`, `createdAt`, `updatedAt`, and `__v` will be specific to the created brand and will vary in each response.



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{baseURL}}/brand/createbrand
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NWQxOGNkNzJjZTExNDlkYmIwZTcyZCIsImlhdCI6MTcwMDYwMDAzMSwiZXhwIjoxNzAwODU5MjMxfQ.1w6wWQlyIJ-AQb_fYScCFTrrbOCxfk3FbYoYP3awdMU |  |



***Body:***

```js        
{
    "name":"adidas"
}
```



### 2. get All Brand


This API endpoint allows you to retrieve a list of brands.

To make a request, send a GET request to `{{baseURL}}/brand/`.

The response will contain a status code and a JSON object with the following properties:

- `status` (string): Indicates the status of the response.
- `message` (string): Provides additional information about the response.
- `brands` (array): Contains a list of brand objects.
    - `_id` (string): The unique identifier of the brand.
    - `name` (string): The name of the brand.
    - `user` (string): The user associated with the brand.
    - `products` (array): Contains the products associated with the brand.
    - `createdAt` (string): The timestamp of when the brand was created.
    - `updatedAt` (string): The timestamp of when the brand was last updated.
    - `__v` (number): The version of the brand object.

Please note that the values for `_id`, `name`, `user`, `products`, `createdAt`, `updatedAt`, and `__v` will be specific to each brand and may vary in your response.

Make sure to handle the response appropriately based on the status code returned. A status code of 200 indicates a successful request.


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{baseURL}}/brand/
```



### 3. Get Brand by Id


This HTTP GET request is used to retrieve information about a specific brand. The request should be made to the endpoint `{{baseURL}}/brand/655d19da72ce1149dbb0e73b`, where `655d19da72ce1149dbb0e73b` is the unique identifier of the brand.

The response to this request will have a status code of 200, indicating a successful request. The response body will contain information about the brand, including its name, user, products, creation date, and last update date.

Here is an example of the response body:

``` json
{
  "status": "",
  "message": "",
  "brand": {
    "_id": "",
    "name": "",
    "user": "",
    "products": [""],
    "createdAt": "",
    "updatedAt": "",
    "__v": 0
  }
}

 ```

Please note that the actual values for the properties `_id`, `name`, `user`, `products`, `createdAt`, `updatedAt`, and `__v` will be specific to the brand being requested.

To use this endpoint, replace `655d19da72ce1149dbb0e73b` in the URL with the actual identifier of the brand you want to retrieve.


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{baseURL}}/brand/655b1cfebbcda4ced65f286c
```



### 4. Update Brand By ID



***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{baseURL}}/brand/655b696c3fb89e817b9ff904
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NWEyOTUyM2Y2YTg2OTVmYWYyYWZlOSIsImlhdCI6MTcwMDQxNTIyMywiZXhwIjoxNzAwNjc0NDIzfQ.4St-7_LXXlpqhuj7LS8p76qfl4PdfUPkjuYfXW_7rOE |  |



***Body:***

```js        
{
    "name":"Addidas"
}
```



### 5. Delete the brand with ID



***Endpoint:***

```bash
Method: DELETE
Type: 
URL: {{baseURL}}/brand/655b1cfebbcda4ced65f286c
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NWEyOTUyM2Y2YTg2OTVmYWYyYWZlOSIsImlhdCI6MTcwMDQxNTIyMywiZXhwIjoxNzAwNjc0NDIzfQ.4St-7_LXXlpqhuj7LS8p76qfl4PdfUPkjuYfXW_7rOE |  |



## Colors

Creating colour so that user can find products by color



### 1. Create



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{baseURL}}/color/
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NWEyOTUyM2Y2YTg2OTVmYWYyYWZlOSIsImlhdCI6MTcwMDQwNzk2NCwiZXhwIjoxNzAwNjY3MTY0fQ.m1VpipaawfG6oWPGO_TM48OCEAsMOp-wTf49pOIGRpI |  |



***Body:***

```js        
{
    "name":"red"
}
```



### 2. get



***Endpoint:***

```bash
Method: GET
Type: 
URL: {{baseURL}}/color/
```



### 3. Get By ID



***Endpoint:***

```bash
Method: GET
Type: 
URL: {{baseURL}}/color/655b7df994c7a55f67103a33
```



### 4. Update By ID



***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{baseURL}}/brand/655b1cfebbcda4ced65f286c
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NWEyOTUyM2Y2YTg2OTVmYWYyYWZlOSIsImlhdCI6MTcwMDQxNTIyMywiZXhwIjoxNzAwNjc0NDIzfQ.4St-7_LXXlpqhuj7LS8p76qfl4PdfUPkjuYfXW_7rOE |  |



***Body:***

```js        
{
    "name":"Addidas"
}
```



### 5. Delete By ID



***Endpoint:***

```bash
Method: DELETE
Type: 
URL: {{baseURL}}/color/655b7fe33ff7cbe5ca2cc8bd
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NWEyOTUyM2Y2YTg2OTVmYWYyYWZlOSIsImlhdCI6MTcwMDQxNTIyMywiZXhwIjoxNzAwNjc0NDIzfQ.4St-7_LXXlpqhuj7LS8p76qfl4PdfUPkjuYfXW_7rOE |  |



## Review



### 1. Create


This API endpoint allows you to add a review to a specific resource identified by its ID. The resource ID is included in the URL as a path parameter.

To add a review, send a POST request to the following URL:

```
{{baseURL}}/review/655d19ed72ce1149dbb0e740

 ```

### Request Body

The request body should contain the necessary information to create the review. The specific parameters and their values depend on the requirements of the API.

### Response

The API will respond with a status code and a JSON object containing a status and message.

Example Response:

```
Status: 400
{
    "status": "",
    "message": ""
}

 ```

Please note that the actual values for the "status" and "message" properties may vary depending on the specific error encountered during the request.


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{baseURL}}/review/655d19ed72ce1149dbb0e74
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NWEyOTUyM2Y2YTg2OTVmYWYyYWZlOSIsImlhdCI6MTcwMDQwNzk2NCwiZXhwIjoxNzAwNjY3MTY0fQ.m1VpipaawfG6oWPGO_TM48OCEAsMOp-wTf49pOIGRpI |  |



***Body:***

```js        
{
    "message":"Great To buy",
    "rating":"5"


}
```



## Order



### 1. Create


This HTTP POST request is used to create a new order. The request is sent to the URL `{{baseURL}}/order/` with an optional query parameter `coupon` set to `NEWYEAR`. The request may include additional parameters in the request body.

The last execution of this request returned a response with a status code of 200. The response body included a JSON object with a `url` property, which was an empty string.

Please refer to the API documentation for more details on the request parameters and response structure.


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{baseURL}}/order/
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NWEyOTUyM2Y2YTg2OTVmYWYyYWZlOSIsImlhdCI6MTcwMDU1OTExOCwiZXhwIjoxNzAwODE4MzE4fQ.E427iS3DWpHAGWsSwkTOzcqDzugMj3km9m39Q99w9Bg |  |



***Body:***

```js        
{
  "orderItems": [
    {
        "_id":"655a29213f6a8695faf2afe6",
      "name": "Skirt",
      "qty": 10,
      "price": 50,
      "description":"Best Skirt"
      // No _id here, let MongoDB generate it
    },
    {
    
        "_id":"655bdb2cb55406d8a877a678",
      "name": "Monkey Cap",
      "qty": 10,
      "price": 50,
      "description":"Monkey Cap"
    }
  ],
  "shippingAddress": {
    "firstname": "Anand Kumar",
    "postalAddress": "Wasilpur"
  },
  "totalPrice": 500  // Send as a number, not a string
}

```



### 2. get All Orders


This API endpoint allows you to retrieve a list of orders.

To make a request, send an HTTP GET request to `{{baseURL}}/order/`.

The response will contain a list of orders, each with the following properties:

- `success` (boolean): Indicates whether the request was successful or not.
- `message` (string): A message related to the request, if any.
- `orders` (array): An array of order objects, each representing an individual order.
    - `_id` (string): The unique identifier of the order.
    - `user` (string): The user associated with the order.
    - `orderItems` (array): An array of order item objects, each representing an individual item in the order.
        - `_id` (string): The unique identifier of the order item.
        - `name` (string): The name of the item.
        - `qty` (number): The quantity of the item.
        - `price` (number): The price of the item.
    - `shippingAddress` (object): The shipping address associated with the order.
        - `address` (string): The address.
        - `city` (string): The city.
        - `postalCode` (string): The postal code.
        - `province` (string): The province.
        - `phone` (string): The phone number.
    - `paymentStatus` (string): The payment status of the order.
    - `paymentMethod` (string): The payment method used for the order.
    - `totalPrice` (number): The total price of the order.
    - `currency` (string): The currency used for the order.
    - `status` (string): The status of the order.
    - `orderNumber` (string): The order number.
    - `createdAt` (string): The date and time when the order was created.
    - `updatedAt` (string): The date and time when the order was last updated.
    - `__v` (number): The version of the order object.

Please note that the response may contain multiple orders, each with their own set of properties.

Example response:

``` json
{
  "success": true,
  "message": "",
  "orders": [
    {
      "_id": "order1",
      "user": "user1",
      "orderItems": [
        {
          "_id": "item1",
          "name": "Item 1",
          "qty": 2,
          "price": 10
        },
        {
          "_id": "item2",
          "name": "Item 2",
          "qty": 1,
          "price": 15
        }
      ],
      "shippingAddress": {
        "address": "123 Street",
        "city": "City",
        "postalCode": "12345",
        "province": "Province",
        "phone": "123-456-7890"
      },
      "paymentStatus": "paid",
      "paymentMethod": "credit card",
      "totalPrice": 35,
      "currency": "USD",
      "status": "completed",
      "orderNumber": "123456",
      "createdAt": "2022-01-01T00:00:00.000Z",
      "updatedAt": "2022-01-01T00:00:00.000Z",
      "__v": 0
    }
  ]
}

 ```


***Endpoint:***

```bash
Method: GET
Type: RAW
URL: {{baseURL}}/order/
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NWQxOGNkNzJjZTExNDlkYmIwZTcyZCIsImlhdCI6MTcwMDYwMDAzMSwiZXhwIjoxNzAwODU5MjMxfQ.1w6wWQlyIJ-AQb_fYScCFTrrbOCxfk3FbYoYP3awdMU |  |



***Body:***

```js        
{
  "event": "payment.captured",
  "payload": {
    "order_id": "655bdb2cb55406d8a877a678"
  }
}

```



### 3. get Order sum


This API endpoint is used to retrieve the summary of sales orders. It sends an HTTP GET request to the `{{baseURL}}/order/sales/sum` URL.

The response of the last execution had a status code of 200, indicating a successful response. The response body included the following information:

- `success`: A boolean value indicating whether the request was successful or not.
- `message`: A string field that can be used to convey any additional information or error messages.
- `orders`: An array of objects representing the summary of sales orders. Each object contains the following fields:
    - `_id`: The unique identifier of the order.
    - `minimumSale`: The minimum sale amount among all the orders.
    - `totalSales`: The total sales amount across all the orders.
    - `maxSale`: The maximum sale amount among all the orders.
    - `avgSale`: The average sale amount across all the orders.
- `saleToday`: An array of objects representing the summary of sales made today. Each object contains the following fields:
    - `_id`: The unique identifier of the order (null in this case).
    - `totalSales`: The total sales amount made today.

Please note that the values of `_id`, `minimumSale`, `totalSales`, `maxSale`, `avgSale`, and `totalSales` may vary depending on the actual data.

To use this endpoint, send an HTTP GET request to the specified URL. No request parameters are required.

Example:

```
GET {{baseURL}}/order/sales/sum

 ```

The response will contain the summary of sales orders and sales made today.

Example response:

```
{
  "success": true,
  "message": "",
  "orders": [
    {
      "_id": null,
      "minimumSale": 0,
      "totalSales": 0,
      "maxSale": 0,
      "avgSale": 0
    }
  ],
  "saleToday": [
    {
      "_id": null,
      "totalSales": 0
    }
  ]
}

 ```


***Endpoint:***

```bash
Method: GET
Type: RAW
URL: {{baseURL}}/order/
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NWQxOGNkNzJjZTExNDlkYmIwZTcyZCIsImlhdCI6MTcwMDYwMDAzMSwiZXhwIjoxNzAwODU5MjMxfQ.1w6wWQlyIJ-AQb_fYScCFTrrbOCxfk3FbYoYP3awdMU |  |



***Body:***

```js        
{
  "event": "payment.captured",
  "payload": {
    "order_id": "655bdb2cb55406d8a877a678"
  }
}

```



### 4. Get By ID


This API endpoint retrieves information about a specific order by making an HTTP GET request to `{{baseURL}}/order/655d23a02c2aac003b6b97b5`. The order ID is included in the URL path.

The last execution of this request returned a response with a status code of 200, indicating a successful request. The response body contains the following information:

- `success`: A boolean value indicating whether the request was successful or not.
- `message`: A string message, which is empty in this case.
- `order`: An object representing the order details.
    - `_id`: The unique ID of the order.
    - `user`: The user associated with the order.
    - `orderItems`: An array of objects representing the items included in the order.
        - `_id`: The unique ID of the item.
        - `name`: The name of the item.
        - `qty`: The quantity of the item.
        - `price`: The price of the item.
    - `shippingAddress`: An object representing the shipping address for the order.
        - `address`: The address for shipping.
        - `city`: The city for shipping.
        - `postalCode`: The postal code for shipping.
        - `province`: The province for shipping.
        - `phone`: The phone number for shipping.
    - `paymentStatus`: The payment status of the order.
    - `paymentMethod`: The payment method used for the order.
    - `totalPrice`: The total price of the order.
    - `currency`: The currency used for the order.
    - `status`: The status of the order.
    - `orderNumber`: The order number.
    - `createdAt`: The timestamp of when the order was created.
    - `updatedAt`: The timestamp of when the order was last updated.
    - `__v`: A version field.

Please note that specific values such as names, emails, and IDs have been omitted for security and privacy reasons.


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{baseURL}}/order/655cfc101b5bfc73ed9cf95
```



### 5. Update By ID


This API endpoint is used to update an existing order. It is an HTTP PUT request that requires the order ID to be provided in the URL. The order ID in this case is "655d23a02c2aac003b6b97b5".

The response from the last execution of this request returned a status code of 200, indicating a successful update. The response body includes the following properties:

- success: A boolean value indicating whether the update was successful or not.
- message: A string field that can be used to display any additional message related to the update.
- updatedOrder: An object containing the updated order details. The properties of the updatedOrder object include:
    - _id: The unique identifier of the order.
    - user: The user associated with the order.
    - orderItems: An array of objects representing the items in the order. Each item object includes the following properties:
        - _id: The unique identifier of the item.
        - name: The name of the item.
        - qty: The quantity of the item.
        - price: The price of the item.
    - shippingAddress: An object representing the shipping address. The properties of the shippingAddress object include:
        - address: The address of the shipping location.
        - city: The city of the shipping location.
        - postalCode: The postal code of the shipping location.
        - province: The province of the shipping location.
        - phone: The phone number associated with the shipping address.
    - paymentStatus: The payment status of the order.
    - paymentMethod: The payment method used for the order.
    - totalPrice: The total price of the order.
    - currency: The currency used for the order.
    - status: The status of the order.
    - orderNumber: The order number.
    - createdAt: The date and time when the order was created.
    - updatedAt: The date and time when the order was last updated.
    - __v: A version field indicating the version of the order object.

Please note that specific values like names, emails, and personal information are not included in the description for security and privacy reasons.


***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{baseURL}}/brand/655b1cfebbcda4ced65f286c
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NWEyOTUyM2Y2YTg2OTVmYWYyYWZlOSIsImlhdCI6MTcwMDQxNTIyMywiZXhwIjoxNzAwNjc0NDIzfQ.4St-7_LXXlpqhuj7LS8p76qfl4PdfUPkjuYfXW_7rOE |  |



***Body:***

```js        
{
    "name":"Addidas"
}
```



## Coupons



### 1. Create Coupons


This API endpoint is used to create a new coupon. It sends an HTTP POST request to the specified URL.

### Request

The request should include the following parameters:

- `code` (string): The code for the coupon.
- `startDate` (string): The start date of the coupon.
- `endDate` (string): The end date of the coupon.
- `discount` (number): The discount amount for the coupon.
- `user` (string): The user associated with the coupon.
    

### Response

The response will have the following properties:

- `status` (string): The status of the response.
- `message` (string): A message related to the response.
- `coupon` (object): An object containing the details of the created coupon.
    - `code` (string): The code of the coupon.
    - `startDate` (string): The start date of the coupon.
    - `endDate` (string): The end date of the coupon.
    - `discount` (number): The discount amount for the coupon.
    - `user` (string): The user associated with the coupon.
    - `_id` (string): The unique ID of the coupon.
    - `createdAt` (string): The date and time when the coupon was created.
    - `updatedAt` (string): The date and time when the coupon was last updated.
    - `__v` (number): The version of the coupon.
    - `isExpired` (boolean): Indicates whether the coupon is expired or not.
    - `daysLeft` (string): The number of days left for the coupon to expire.
    - `id` (string): The ID of the coupon.

### Example

Request:

```
POST {{baseURL}}/coupon/
{
  "code": "SUMMER2022",
  "startDate": "2022-06-01",
  "endDate": "2022-08-31",
  "discount": 20,
  "user": "john@example.com"
}

 ```

Response:

```
Status: 201
{
  "status": "",
  "message": "",
  "coupon": {
    "code": "SUMMER2022",
    "startDate": "2022-06-01",
    "endDate": "2022-08-31",
    "discount": 20,
    "user": "john@example.com",
    "_id": "",
    "createdAt": "",
    "updatedAt": "",
    "__v": 0,
    "isExpired": true,
    "daysLeft": "",
    "id": ""
  }
}

 ```


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{baseURL}}/coupon/
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NWEyOTUyM2Y2YTg2OTVmYWYyYWZlOSIsImlhdCI6MTcwMDU1OTExOCwiZXhwIjoxNzAwODE4MzE4fQ.E427iS3DWpHAGWsSwkTOzcqDzugMj3km9m39Q99w9Bg |  |



***Body:***

```js        
{
    "code":"New sale",
    "discount":"20",
    "startDate":"11-23-2023",
    "endDate":"02-27-2024"
}
```



### 2. get All Coupon


This API endpoint allows you to retrieve a list of coupons.

To retrieve the list of coupons, make an HTTP GET request to `{{baseURL}}/coupon/`.

The response will be a JSON object with the following properties:

- `status`: The status of the response.
- `message`: A message associated with the response.
- `coupons`: An array of coupon objects.
    

Each coupon object in the `coupons` array will have the following properties:

- `_id`: The unique identifier of the coupon.
- `code`: The code associated with the coupon.
- `startDate`: The start date of the coupon.
- `endDate`: The end date of the coupon.
- `discount`: The discount amount of the coupon.
- `user`: The user associated with the coupon.
- `createdAt`: The creation date of the coupon.
- `updatedAt`: The last update date of the coupon.
- `__v`: The version of the coupon.
- `isExpired`: Indicates whether the coupon is expired or not.
- `daysLeft`: The number of days left for the coupon to expire.
- `id`: An alternative unique identifier for the coupon.
    

Please note that the values for `_id`, `code`, `user`, `createdAt`, `updatedAt`, and `id` have been redacted for security purposes.

Example response:

```
{
    "status": "",
    "message": "",
    "coupons": [
        {
            "_id": "",
            "code": "",
            "startDate": "",
            "endDate": "",
            "discount": 0,
            "user": "",
            "createdAt": "",
            "updatedAt": "",
            "__v": 0,
            "isExpired": true,
            "daysLeft": "",
            "id": ""
        }
    ]
}

 ```


***Endpoint:***

```bash
Method: GET
Type: RAW
URL: {{baseURL}}/coupon/
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NWQxOGNkNzJjZTExNDlkYmIwZTcyZCIsImlhdCI6MTcwMDYwMDAzMSwiZXhwIjoxNzAwODU5MjMxfQ.1w6wWQlyIJ-AQb_fYScCFTrrbOCxfk3FbYoYP3awdMU |  |



***Body:***

```js        
{
  "event": "payment.captured",
  "payload": {
    "order_id": "655bdb2cb55406d8a877a678"
  }
}

```



### 3. Get By ID



***Endpoint:***

```bash
Method: GET
Type: 
URL: {{baseURL}}/order/655cfc101b5bfc73ed9cf95
```



### 4. Update By ID



***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{baseURL}}/brand/655b1cfebbcda4ced65f286c
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Authorization | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NWEyOTUyM2Y2YTg2OTVmYWYyYWZlOSIsImlhdCI6MTcwMDQxNTIyMywiZXhwIjoxNzAwNjc0NDIzfQ.4St-7_LXXlpqhuj7LS8p76qfl4PdfUPkjuYfXW_7rOE |  |



***Body:***

```js        
{
    "name":"Addidas"
}
```



---
[Back to top](#nodejs-ecommerce-api)

>Generated at 2023-11-23 03:14:10 by [docgen](https://github.com/thedevsaddam/docgen)
