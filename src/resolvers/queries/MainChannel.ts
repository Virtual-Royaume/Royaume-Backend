import { Resolvers } from "../../interfaces/ServerSchema.js";
import channelCollection from "../../database/collections/MainChannel.js";

const mainChannelQuery: Resolvers["Query"] = {
	channels: async () => await channelCollection.find().toArray()
};

export default mainChannelQuery;