## Tech Stack

- [NodeJs](https://nodejs.org/en/about/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [JWT](https://jwt.io/introduction)

# Getting Started

## Set up in Your local system

1. You must have git, nodejs and mongoDB installed in your local system.
2. Run MongoDB on PORT 27017.
   ```sh
   mongod
   ```
3. Fork this repo and then clone the forked repo.
   ```sh
   git clone 'YOUR REPO LINK'
   ```
4. install dependencies and run the server
   ```sh
   npm install
   npm run dev
   ```
   This will make the server run at `http://localhost:3000/`

## APIs

| Routes | parameters | body | Description |
| -------- | -------- | -------- | -------- |
| `POST` /signup | | username, password, name(optional) | Registers a user. |
| `POST` /createAdmin | | username, password, name(optional) | Creates a new admin |
| `POST` /login | | username, password | Used to login a user or an admin |
| `POST` /logout | | | You need to pass the token received on login or signup as a header in the form of a bearer token to logout a user or admin. |
| `POST` /logoutAll | | | Same as logout but logout the user or admin from all devices. |
| `POST` /admin/addProduct | | productName, productPrice |  You need to pass the token received on login or signup as a header in the form of a bearer token to create a product. Only admin can create, will give 404 error if user calls it. |
| `PATCH` /admin/updateProduct/:id | id | productName(optional), productPrice(optional) | You need to pass the token received on login or signup as a header in the form of a bearer token to update a product. Only admin can update, will give 404 error if user calls it. |
| `DELETE` /admin/deleteProduct/:id | id | | You need to pass the token received on login or signup as a header in the form of a bearer token to delete a product. Only admin can delete, will give 404 error if user calls it. |
| `GET` /products/getAll | | | Used to get all products available. |
| `GET` /products/:id | id | | Used to get a particular product using its id. |
