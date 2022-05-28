import { Resolvers } from "../../interfaces/ServerSchema";
import presenceMessageCollection from "../../database/collections/PresenceMessage";

const presenceMessageQuery: Resolvers["Query"] = {
    presenceMessages: async() => (await presenceMessageCollection.find().toArray()).map(element => {
        return { ...element, _id: element._id.toString() };
    })
};

export default presenceMessageQuery;