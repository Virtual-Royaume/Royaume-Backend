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
import presenceMessageQuery from "./queries/PresenceMessage";
import presenceMessageMutation from "./mutations/PresenceMessage";

const resolvers: Resolvers = {
    Date: date,

    Query: {
        ...mainChannelQuery,
        ...mainRoleQuery,
        ...memberQuery,
        ...serverActivityQuery,
        ...presenceMessageQuery
    },

    Mutation: {
        ...mainChannelMutation,
        ...mainRoleMutation,
        ...memberMutation,
        ...serverActivityMutation,
        ...presenceMessageMutation
    }
};

export default resolvers;