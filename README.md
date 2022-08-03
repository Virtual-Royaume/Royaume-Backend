# Royaume API
The Royaume API, it is a GraphQL API written in TypeScript using the MongoDB database. It is used by the various services of the Royaume (bot Discord, website and more).

## How to start 
You must have Docker and Docker Compose installed on your machine to properly start this project.

Here are the commands you can do:
- ``docker compose up --build -d`` : create, build and start the services (run this command the first time you work with this project)
- ``docker compose start`` : start the services
- ``docker compose restart`` : restart the services
- ``docker compose stop`` : stop the services
- ``docker compose logs -f royaume-api`` : displays the logs 

## Documentation 
API endpoint : [api.royaume.world](https://api.royaume.world)

All requests to the API must have the header "authorization" with the private token, ask the project mainteners for get it.

This API uses GraphQL, useful resources :
- [Learn GraphQL](https://graphql.org/learn/)
- [graphql-request](https://www.npmjs.com/package/graphql-request) package for easy queries
- [Example of requests](./src/others/ClientTester.ts) on this API (you can use this file for your own tests)
- [Schema (documentation) of the API](./resources/graphql/Schema.gql)
