import { request, gql } from "graphql-request"; // https://www.npmjs.com/package/graphql-request

// ...

const response = await request(
  "http://localhost:3000",
  "",
  {},
  {
    authorization: "7fe47986-0ce9-4cfc-9294-cfc167ef32e8",
  }
);

console.log(response);
