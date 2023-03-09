import { Resolvers } from "$core/interfaces/ServerSchema";
import { channelCollection } from "$core/database/collections/MainChannel";

export const mainChannelQuery: Resolvers["Query"] = {
    channels: async() => await channelCollection.find().toArray()
};