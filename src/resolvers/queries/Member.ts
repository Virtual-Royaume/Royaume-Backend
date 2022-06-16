import { Resolvers } from "../../interfaces/ServerSchema";
import memberCollection, { getMemberByDiscordId, getMembersWithPoints } from "../../database/collections/Member";
import { getFields } from "../../utils/GraphQL";

const memberQuery: Resolvers["Query"] = {
    // @ts-ignore
    members: async (_, __, ___, info) => {
        if (getFields(info)["activity.points"]) {
            return await getMembersWithPoints();
        }

        return await memberCollection.find({ isOnServer: true }).toArray();
    },

    member: async (_, { id }) => await getMemberByDiscordId(id)
};

export default memberQuery;