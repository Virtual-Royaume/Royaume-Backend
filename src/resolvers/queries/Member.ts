import { Resolvers } from "../../interfaces/ServerSchema.js";
import memberCollection, { getMemberByDiscordId } from "../../database/collections/Member.js";

const memberQuery: Resolvers["Query"] = {
	members: async () => await memberCollection.find({ isOnServer: true }).toArray(),

	member: async (_, { id }) => await getMemberByDiscordId(id)
};

export default memberQuery;