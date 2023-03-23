import { Resolvers } from "$core/interfaces/ServerSchema";
import { presenceMessageCollection } from "$core/database/collections/PresenceMessage";
import { ObjectId } from "mongodb";

export const presenceMessageMutation: Resolvers["Mutation"] = {
    addPresenceMessage: async(_, { type, text }) => !!(
        await presenceMessageCollection.insertOne({ type, text })
    ).insertedId,

    removePresenceMessage: async(_, { id }) => {
        return !!(await presenceMessageCollection.deleteOne({ _id: new ObjectId(id) })).deletedCount;
    }
};