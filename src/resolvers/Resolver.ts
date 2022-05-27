import { Resolvers } from "../interfaces/ServerSchema";
import { date } from "./Scalar";
import mainChannelMutation from "./mutations/MainChannel";
import mainRoleMutation from "./mutations/MainRole";
import memberMutation from "./mutations/Member";
import serverActivityMutation from "./mutations/ServerActivity";
import mainChannelQuery from "./queries/MainChannel";
import mainRoleQuery from "./queries/MainRole";
import memberQuery from "./queries/Member";
import serverActivityQuery from "./queries/ServerActivity";

const resolvers: Resolvers = {
    Date: date,

    Query: {
        ...mainChannelQuery,
        ...mainRoleQuery,
        ...memberQuery,
        ...serverActivityQuery
    },

    Mutation: {
        ...mainChannelMutation,
        ...mainRoleMutation,
        ...memberMutation,
        ...serverActivityMutation
    }
};

export default resolvers;