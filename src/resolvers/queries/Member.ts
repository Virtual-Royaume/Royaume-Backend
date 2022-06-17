import { Member, Resolvers } from "../../interfaces/ServerSchema";
import memberCollection, { getMemberByDiscordId, getMembersWithPoints } from "../../database/collections/Member";
import { getFields } from "../../utils/GraphQL";

const memberQuery: Resolvers["Query"] = {
    members: async (_, __, ___, info) => {
        const fields = getFields(info);

        if (fields["activity.points.count"] || fields["activity.points.progress"]) {
            return await getMembersWithPoints();
        }

        return await memberCollection.find({ isOnServer: true }).toArray() as Member[]; // 🤮
    },

    member: async (_, { id }, ___, info) => {
        const fields = getFields(info);

        if (fields["activity.points.count"] || fields["activity.points.progress"]) {
            return (await getMembersWithPoints()).find(member => member._id === id) ?? null;
        }

        return await getMemberByDiscordId(id) as Member; // 🤮
    }
};

export default memberQuery;