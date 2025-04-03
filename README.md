## Description

NestJS REST API that performs image processing and stores data in MongoDB. The application is hosted on Docker for easy configuration and deployment.

## Prerequisites

Please make sure you have the following requirements installed before continuing:

- Docker: [Installation](https://docs.docker.com/engine/install/ubuntu/).
- Docker Compose: [Installation](https://docs.docker.com/compose/install/).
- Node.js (optional for local development): [Installation](https://nodejs.org/en/download/package-manager).

## Light it up

There are two ways to test the application. The first is to run the application in a Docker container. The second is to start the service locally.

### Option 1. Docker

We install the dependencies

```bash
$ npm install
```

We need to generate a .env file in the root of the project for the MongoDB variables. This data is sensitive and should never be versioned, but it is necessary for testing.

```
MONGO_INITDB_ROOT_USERNAME=root
MONGO_INITDB_ROOT_PASSWORD=admin
MONGO_INITDB_DATABASE=img-tasks-api
MONGO_URI=mongodb://root:admin@mongodb:27017/img-tasks-api?authSource=admin
```

The entire application has been dockerized to make it easier to test. To do this, there is the docker-compose.yml file in this same root folder /img-tasks-api, where we have to navigate in the terminal and run:

```bash
$ docker-compose up --build -d
```

Once Docker is up and running, we launch the script that adds test data.

```bash
$ npm run create-tasks
```

This will provide us with the necessary environment, having Nestjs listening on localhost:3000. It is normal for docker-compose build to take a while to complete the first time it is run.

Stop the process by running

```bash
$ docker-compose down
```

If you want to interact with the API, feel free to go to the [api](http://localhost:3000/api) to see the Swagger interface.

![alt text](https://i.ibb.co/0jXgtC1c/swagger.png)

### Endpoints

To make requests we can also use an interface like Insomnia

- POST /tasks Create a task and process the images.
  ![alt text](https://i.ibb.co/DH8z7LjP/post-tasks.png)
- GET /tasks/:taskId Gets the data for a specific task by ID.
  ![alt text](https://i.ibb.co/SXVQD1LL/get-tasks.png)

### MongoDB

To view the database and its collections we can use an application like [MongoDB Compass](https://www.mongodb.com/products/tools/compass)

![alt text](https://i.ibb.co/jZJ0rpBy/mongodb.png)

## Option 2. Local environment

We need to generate a .env.local file in the root of the project for the MongoDB variables. This data is sensitive and should never be versioned, but it is necessary for testing.

```
MONGO_INITDB_ROOT_USERNAME=root
MONGO_INITDB_ROOT_PASSWORD=admin
MONGO_INITDB_DATABASE=img-tasks-api
MONGO_URI=mongodb://root:admin@mongodb:27017/img-tasks-api?authSource=admin
```

Once the docker is built, we stop nest_app to be able to start it locally since they share a port

Compile and run the project:

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

## Run tests

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

## Sample data

The test images are located in the images folder at the root of the project. The script uses the first two images, but you can test it with image3.jpg by making a POST request.

```http
POST http://localhost:3000/tasks
Content-Type: application/json

{
  "imagePath": "image3.jpg"
}
```

Images can be added to this folder for testing purposes.

To view the processed images we can run the following command in terminal

```bash
$ docker cp nest_app:/app/output ./output
```

An output folder will be generated in the root of the project with the new images.
