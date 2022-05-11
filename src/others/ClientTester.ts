import { request, gql } from "graphql-request"; // https://www.npmjs.com/package/graphql-request 

const membersQuery = gql`
  query {
    members {
      username
      profilPicture
    }
  }
`;

const response = await request("http://localhost:3000", membersQuery);

console.log(response);