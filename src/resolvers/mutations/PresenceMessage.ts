import { Resolvers } from "../../interfaces/ServerSchema";
import presenceMessageCollection from "../../database/collections/PresenceMessage";
import { ObjectId } from "mongodb";

const presenceMessageMutation: Resolvers["Mutation"] = {
    addPresenceMessage: async(_, { type, text }) => !!(
        await presenceMessageCollection.insertOne({ type, text })
    ).insertedId,

    removePresenceMessage: async(_, { id }) => {
        console.log(id);
        return !!(await presenceMessageCollection.deleteOne({ _id: new ObjectId(id) })).deletedCount;
    }
};

export default presenceMessageMutation;