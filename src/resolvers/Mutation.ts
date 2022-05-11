import memberCollection, { createMember } from "../database/collections/Member.js";
import { Resolvers } from "../interfaces/GraphQL.js";

const mutation: Resolvers["Mutation"] = {
	createMember: async (_, { id, username, profilPicture, isOnServer }) => 
		await createMember(id, username, profilPicture, isOnServer ?? true),

  updateMember: async (_, { id, input }) => {
    // Remove null properties of input :
    const insertInput = Object.fromEntries(
      Object.entries(input).filter(([_, value]) => value !== null)
    );

    // Try to update member :
    try {
      await memberCollection.updateOne({ _id: id }, { $set: insertInput });

      return true;
    } catch {
      return false;
    }
  },

  updateMemberDiscordActivity: () => false, // TODO
  
  updateMemberDiscordActivityChannel: () => false // TODO
}

export default mutation;