import { Resolvers } from "../interfaces/ServerSchema.js";
import mainChannelMutation from "./mutations/MainChannel.js";
import mainRoleMutation from "./mutations/MainRole.js";
import memberMutation from "./mutations/Member.js";
import mainChannelQuery from "./queries/MainChannel.js";
import mainRoleQuery from "./queries/MainRole.js";
import memberQuery from "./queries/Member.js";
import serverActivityQuery from "./queries/ServerActivity.js";
import { date } from "./Scalar.js";

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
        ...serverActivityQuery
    }
};

export default resolvers;