# JWT & Mongo

Authentication & Authorization example with JWT and Mongo.\

## Features

* User, Roles and Notes create, read and update operations.
* Express middleware built upon JWT for authentication and authorization.
* Middleware for validating user ownership over a resource.
* Powered by MongoDB and Mongoose.

## Environment variables

A `.env` file is required with the following environment variables declared:

* `PORT`
* `MONGODB_URI` (you can create a free database using MongoDB Atlas)
* `JWT_SECRET`
