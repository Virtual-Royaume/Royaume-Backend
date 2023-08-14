import { Resolvers } from "$core/interfaces/ServerSchema";
import { date } from "$core/resolvers/Scalar";
import { mainChannelMutation } from "$core/resolvers/mutations/MainChannel";
import { mainRoleMutation } from "$core/resolvers/mutations/MainRole";
import { memberMutation } from "$core/resolvers/mutations/Member";
import { serverActivityMutation } from "$core/resolvers/mutations/ServerActivity";
import { mainChannelQuery } from "$core/resolvers/queries/MainChannel";
import { mainRoleQuery } from "$core/resolvers/queries/MainRole";
import { memberQuery } from "$core/resolvers/queries/Member";
import { serverActivityQuery } from "$core/resolvers/queries/ServerActivity";
import { presenceMessageQuery } from "$core/resolvers/queries/PresenceMessage";
import { presenceMessageMutation } from "$core/resolvers/mutations/PresenceMessage";

export const resolvers: Resolvers = {
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