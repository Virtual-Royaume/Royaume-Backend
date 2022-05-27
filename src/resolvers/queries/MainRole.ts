import { Resolvers } from "../../interfaces/ServerSchema";
import roleCollection from "../../database/collections/MainRole";

const mainRoleQuery: Resolvers["Query"] = {
    roles: async() => await roleCollection.find().toArray()
};

export default mainRoleQuery;