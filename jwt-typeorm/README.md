# JWT, TS & TypeORM

Authentication & Authorization example with JWT, Typescript and TypeORM.

## Features

* User, Roles and Notes CRUD operations.
* Express middleware built upon JWT for authentication and authorization.
* Middleware for validating user ownership over a resource.
* Typescript.
* TypeORM.

## Environment variables

A `.env` file is required with the following environment variables declared:

* `PORT`
* `FRONTEND_CORS_URL`
* `POSTGRES_PASSWORD`
* `POSTGRES_URI`
* `JWT_SECRET`

## Run DB locally

You can run a local db using docker instead of running your own postgres server.

```
docker run -d --name dev-postgres -e POSTGRES_PASSWORD=<YOUR_PASSWORD> -v ${HOME}/postgres-data/:/var/lib/postgresql/data -p 5432:5432 postgres
```
