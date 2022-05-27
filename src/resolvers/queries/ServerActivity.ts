import { Resolvers } from "../../interfaces/ServerSchema.js";
import serverActivityCollection, {
	getServerActivity
} from "../../database/collections/ServerActivity.js";

const serverActivityQuery: Resolvers["Query"] = {
	todayServerActivity: async () => await getServerActivity(),

	serverActivity: async (_, { historyCount }) => {
		return serverActivityCollection
			.find({}, { sort: { date: "desc" }, limit: historyCount })
			.toArray();
	},
};

export default serverActivityQuery;