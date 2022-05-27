import { Resolvers } from "../../interfaces/ServerSchema.js";
import serverActivityCollection, {
	getServerActivity
} from "../../database/collections/ServerActivity.js";

const serverActivityMutation: Resolvers["Mutation"] = {
	setServerActivityMemberCount: async (_, { count }) => {
		const serverActivity = await getServerActivity();

		serverActivity.memberCount = count;

		const result = await serverActivityCollection.updateOne(
			{ date: serverActivity.date },
			{ $set: serverActivity }
		);

		return !!result.modifiedCount;
	}
};

export default serverActivityMutation;