<h1 align="center">ExpressJS - Cazzy RESTfull API</h1>

This project is a backend to my project, [Cazzy POS App](https://github.com/nurf21/Cazzy-POS-App-Frontend). Its main purpose is to make cafe or shop owner easier to checkout and manage datas in database. [More about Express](https://en.wikipedia.org/wiki/Express.js)

## Built With

[![Express.js](https://img.shields.io/badge/Express.js-4.17.1-orange.svg?style=rounded-square)](https://expressjs.com/en/starter/installing.html)
[![Node.js](https://img.shields.io/badge/Node.js-v.12.18.2-green.svg?style=rounded-square)](https://nodejs.org/)

## Requirements

1. <a href="https://nodejs.org/en/download/">Node Js</a>
2. Node_modules
3. <a href="https://www.getpostman.com/">Postman</a>
4. Web Server (ex. localhost)

## How to run the app ?

1. Open app's directory in CMD or Terminal
2. Type `npm install`
3. Make new file a called **.env**, set up first [here](#set-up-env-file)
4. Turn on Web Server and MySQL can using Third-party tool like xampp, etc.
5. Create a database with the name pos_app, and Import file sql to **phpmyadmin**
6. Open Postman desktop application or Chrome web app extension that has installed before
7. Choose HTTP Method and enter request url.(ex. localhost:3001/)
8. You can see all the end point [here](#end-point)

## Set up .env file

Open .env file on your favorite code editor, and copy paste this code below :

```
DB_HOST=localhost // Database host
DB_PASS=          // Database password
DB_USER=root      // Database user
DB_NAME=pos_app   // Database name
PORT=3001         // Port where express is running
IP=127.0.0.1      // IP where express is running
```

## End Points

**1. GET**

- `/product`(Get all product)
  - `{ "page": 1, "limit": 3, "sort" : "product_price DESC" }`

- `/product/search` (Get product by name)
  - `{ "keyword": "latte" }`

- `/product/:id`(Get product by id)

- `/category`(Get all category)

- `/category:id`(Get category by id)

- `/history`(Get all history)
  - `{ "page": 1, "limit": 3, "sort" : "history_created_at DESC" }`

- `/history:id`(Get history by id)

- `/history/chart` (Get data chart)
  - `{ "date": 2020-09-07 }`

- `/history/today` (Get recent orders today)

- `/history/week` (Get recent orders this week)

- `/history/month` (Get recent orders this month)

- `/history/income` (Get daily income)
  - `{ "date": 2020-09-07 }`

- `/history/count` (Get count orders this week)
  - `{ "date": 2020-09-07 }`

- `/history/incomeyear` (Get income this year)
  - `{ "date": 2020-09-07 }`

- `/order`(Get all order)
  - `{ "page": 1, "limit": 5, "sort" : "order_id DESC" }`

- `/order:id`(Get order by id)

- `/users` (Get all user)
  - `{ "page": 1, "limit": 5 }`

**2. POST**

- `/product` (Post product)
  - `{ "product_name": "Orange Juice", "product_image": "blank-product.jpg", "product_price": 10000, "category_id": 1, "product_status" : 1 | 0 }`

- `/category` (Post category)
  - `{ "category_name": "Beverage" }`

- `/order` (Post order)
  - `{ "orders": [{ "product_id": 5, "qty": 2 }, { "product_id": 7, "qty": 2 }] }`

- `/users/register` (Register user)
  - `{ "user_email": "user@cazzypos.com", "user_password": "12345678", "user_name": "user" }`

- `/users/login` (Login user)
  - `{ "user_email": "admin@cazzypos.com", "user_password": "12345678" }`

**3. PATCH**

- `/product/:id` (Update product by id)
  - `{ "product_name": "Lemon Juice", "product_image": "blank-product.jpg", "product_price": 9000, "category_id": 1, "product_status" : 1 | 0 }`

- `/category/:id` (Update category by id)
  - `{ "category_name": "Snack" }`

- `/users/:id` (Update user by id)
  - `{ "user_password": "12345678", "user_name": "user", "user_role": 2, "user_status": 1 }`
  
**4. DELETE**

- `/product/:id` (Delete product by id)

- `/category/:id` (Delete category by id)

## Postman

You can see all the requests [here](https://web.postman.co/collections/12328774-45bcedad-9c68-4741-8447-4f812820e20e?version=latest&workspace=88383a3d-3f6f-4fc1-8edd-b5f288cd8286)