# products-api

API built using NodeJS, ExpressJS, Typescript and PostgreSQL.

To test this API follow these steps:

1. Clone this repository.
2. Run yarn install to install all the dependencies.
3. In pgadmin4 Create a database and name it product-api.
4. Right click on product-api database, select Restore option and select the 'product-api.sql' file from the src folder of our cloned git repo.
5. Create a new file .env inside git repo and set the content as follows:
    -DB_USER=postgres
    -DB_HOST=localhost
    -DB_DATABASE=product-api
    -DB_PASS=admin123
    -DB_PORT=5432
6. Open two terminals and run "tsc -w" command in one terminal and "yarn start" in the other one.

The server will be running now at port 3001.

To test the API endpoints import this collection in your Postman using below link:-
https://www.getpostman.com/collections/8f64fffa2c63ec6c85a0
