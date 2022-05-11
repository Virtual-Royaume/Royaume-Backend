import { request, gql } from "graphql-request"; // https://www.npmjs.com/package/graphql-request 

const membersQuery = gql`
  query {
    members {
      username
      profilPicture
    }
  }
`;

const updateMember = gql`
  mutation UpdateMember($id: ID!, $username: String, $isOnServer: Boolean) {
    updateMember(id: $id, input: {
      username: $username,
      isOnServer: $isOnServer
    })
  }
`;

const response = await request("http://localhost:3000", updateMember, {
  id: "5",
  username: "Tesssttt",
  isOnServer: false
});

console.log(response);