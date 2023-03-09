import { request, gql } from "graphql-request"; // https://www.npmjs.com/package/graphql-request

const members = gql`
    query Members {
        members {
            username
        }
    }
`;

request("http://localhost:3006", members, {}, { authorization: "7fe47986-0ce9-4cfc-9294-cfc167ef32e8" }).then(response => {
    console.log(response);
});