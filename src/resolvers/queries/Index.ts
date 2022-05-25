import { Resolvers } from "../../interfaces/ServerSchema.js";
import mainChannelQuery from "./MainChannelQuery.js";
import mainRoleQuery from "./MainRoleQuery.js";
import memberQuery from "./MemberQuery.js";
import serverActivityQuery from "./ServerActivityQuery.js";

const query: Resolvers["Query"] = {
	...mainChannelQuery,
	...mainRoleQuery,
	...memberQuery,
	...serverActivityQuery
};

export default query;
