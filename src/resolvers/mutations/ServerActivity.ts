import { Resolvers } from "$core/interfaces/ServerSchema";
import { serverActivityCollection, getServerActivity } from "$core/database/collections/ServerActivity";

export const serverActivityMutation: Resolvers["Mutation"] = {
    setServerActivityMemberCount: async(_, { count }) => {
        const serverActivity = await getServerActivity();

        serverActivity.memberCount = count;

        const result = await serverActivityCollection.updateOne(
            { date: serverActivity.date },
            { $set: serverActivity }
        );

        return !!result.modifiedCount;
    }
};