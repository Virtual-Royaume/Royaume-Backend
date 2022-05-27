import { Resolvers } from "../../interfaces/ServerSchema";
import channelCollection from "../../database/collections/MainChannel";

const mainChannelQuery: Resolvers["Query"] = {
    channels: async() => await channelCollection.find().toArray()
};

export default mainChannelQuery;