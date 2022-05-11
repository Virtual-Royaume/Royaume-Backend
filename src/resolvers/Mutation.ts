import memberCollection, { createMember } from "../database/collections/Member.js";
import { Resolvers } from "../interfaces/GraphQL.js";

const mutation: Resolvers["Mutation"] = {
	createMember: async (_, { id, username, profilPicture, isOnServer }) => 
		await createMember(id, username, profilPicture, isOnServer ?? true),
  updateMember: async (_, args) => {
    const id = args.id;

    const data = JSON.parse(JSON.stringify(args));
    delete data["id"];

    try {
      await memberCollection.updateOne({ _id: id }, { $set: data });

      return true;
    } catch {
      return false;
    }
  }
}

export default mutation;