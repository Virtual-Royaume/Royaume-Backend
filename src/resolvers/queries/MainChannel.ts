import { Resolvers } from "$core/interfaces/ServerSchema";
import channelCollection from "$core/database/collections/MainChannel";

const mainChannelQuery: Resolvers["Query"] = {
    channels: async() => await channelCollection.find().toArray()
};

export default mainChannelQuery;