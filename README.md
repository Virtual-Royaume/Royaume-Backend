# Royaume API
The Royaume API, it is a GraphQL API written in TypeScript using the MongoDB database. It is used by the various services of the Royaume (bot Discord, website and more).

## How to start 
### Environment variables
You must set this environment variables in your ``.env`` file :
```
# Port of the Rest API :
PORT=3000

# API access token (for clients) :
API_TOKEN_ACCESS="8cdf0dc6-7fb6-456f-bbe1-a2279b371a66"

# MongoDB connection URL :
MONGO_LINK="get the link in your Discord"
```

### Commands
- ``npm run dev`` : start the server in development mode 
- ``npm run start`` : start the server in production mode
- ``npm run lint`` : Format/lint the code
- ``npm run test-client`` : test with the client file (``/src/others/ClientTester.ts``)
- ``npm run gen-gql`` : generate GraphQL interfaces files

## Documentation 
API : [api.royaume.world](https://dev-api.royaume.world)

All requests to the API must have the header "authorization" with the private token, ask the project mainteners for get it.

This API uses GraphQL, useful resources :
- [Learn GraphQL](https://graphql.org/learn/)
- [Example of requests](./src/others/ClientTester.ts) on this API (you can use this file for your own tests)
- [Schema (documentation) of the API](./resources/graphql/Schema.gql)