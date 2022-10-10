# Royaume API
The Royaume API, it is a GraphQL API written in TypeScript using the MongoDB database. It is used by the various services of the Royaume (bot Discord, website and more).

## How to start 
### Environment variables
You must set this environment variables in your ``.env`` file :
```
# Port of the Rest API :
PORT_API=3009

# MongoDB init username and password :
MONGO_INIT_USERNAME=royaume
MONGO_INIT_PASSWORD=aPasswordForDB

# MongoDB connection URL :
MONGO_URL=mongodb://royaume:aPasswordForDB@royaume-mongo:27017
```

### Docker
You must have Docker and Docker Compose installed on your machine to properly start this project.

Here are the commands you can do:
- ``npm run build-prod`` or ``npm run build-dev`` : for build project with docker for production or development environment
- ``npm run logs`` : see the live logs
- ``npm run start`` or ``npm run restart`` or ``npm run stop`` : start, restart or stop docker containers 
- ``npm run lint`` : Format/lint the code
- ``npm run test-client`` : test with the client file (``/src/others/ClientTester.ts``)
- ``gen-gql`` : generate GraphQL interfaces files
- ``gen-token`` : generate a new API token

## Documentation 
API : [api.royaume.world](https://api.royaume.world)

All requests to the API must have the header "authorization" with the private token, ask the project mainteners for get it.

This API uses GraphQL, useful resources :
- [Learn GraphQL](https://graphql.org/learn/)
- [graphql-request](https://www.npmjs.com/package/graphql-request) package for easy queries
- [Example of requests](./src/others/ClientTester.ts) on this API (you can use this file for your own tests)
- [Schema (documentation) of the API](./resources/graphql/Schema.gql)