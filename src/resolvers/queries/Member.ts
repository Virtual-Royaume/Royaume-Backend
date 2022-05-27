import { Resolvers } from "../../interfaces/ServerSchema";
import memberCollection, { getMemberByDiscordId } from "../../database/collections/Member";

const memberQuery: Resolvers["Query"] = {
    members: async() => await memberCollection.find({ isOnServer: true }).toArray(),

    member: async(_, { id }) => await getMemberByDiscordId(id)
};

export default memberQuery;