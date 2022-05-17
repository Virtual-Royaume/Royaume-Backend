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
    updateMember(
      id: $id
      input: { username: $username, isOnServer: $isOnServer }
    )
  }
`;

const getMembersProfilInfo = gql`
  query getMembersProfilInfo {
    members {
      username
      profilPicture
      isOnServer
    }
  }
`;

const updateStats = gql`
  mutation {
    updateMemberDiscordActivity(
      id: 5
      input: { voiceMinute: 10, messageTotalCount: 15 }
    )
  }
`;

const addRole = gql`
  mutation {
    addRole(roleId: "5555", category: "tgm")
  }
`;

const removeRole = gql`
  mutation {
    removeRole(roleId: "555")
  }
`;

const roles = gql`
  query {
    roles {
      roleId
      category
    }
  }
`;

const getServerActivity = gql`
  query {
    todayServerActivity {
      date
      voiceMinute
      messageCount
      memberCount
    }
  }
`;

const updateDate = gql`
  mutation {
    updateServerActivity(
      input: { date: "2022-05-20", voiceMinute: 20, messageCount: 20 }
    )
  }
`;

const updateMessageInChannel = gql`
  mutation {
    incMemberDiscordActivityChannel(id: 5, channelId: "102")
  }
`;

const createMember = gql`
  mutation {
    createMember(
      id: 5
      username: "Bluzzi"
      profilPicture: "https://exemple.com"
      isOnServer: true
    ) {
      username
    }
  }
`;

const response = await request(
  "http://localhost:3000",
  updateMessageInChannel,
  {}, 
  {
    authorization: "7fe47986-0ce9-4cfc-9294-cfc167ef32e8",
  }
);
console.log(response);

// const response = await request("http://localhost:3000", updateMember, {
//   id: "5",
//   username: "Tesssttt",
//   isOnServer: false
// });

//console.log(response);
