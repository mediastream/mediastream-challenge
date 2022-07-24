# NodeJS

We need to create a route that downloads the entire database to a .csv file.
> <strong>WARNING:</strong> Database contains hundreds of entities and our production server is quite small. Make sure the solution to implement can perform with little resources.

## Preparation
1) Make sure to have an instance of MongoDB running at `mongodb://localhost`
2) Run `node utils/seed.js` to populate the database

## Tasks
1) Create `GET /users` endpoint to stream the CSV response

## Docker
- Run `docker-compose up` to start MongoDB