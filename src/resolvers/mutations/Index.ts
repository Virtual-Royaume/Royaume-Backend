import { Resolvers } from "../../interfaces/ServerSchema.js";
import mainChannelMutation from "./MainChannelMutation.js";
import mainRoleMutation from "./MainRoleMutation.js";
import memberMutation from "./MemberMutation.js";
import serverActivityMutation from "./ServerActivityMutation.js";

const mutation: Resolvers["Mutation"] = {
	...mainChannelMutation,
	...mainRoleMutation,
	...memberMutation,
	...serverActivityMutation
};

export default mutation;