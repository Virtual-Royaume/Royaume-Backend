import { Resolvers } from "../../interfaces/ServerSchema.js";
import roleCollection from "../../database/collections/MainRole.js";

const mainRoleQuery: Resolvers["Query"] = {
    roles: async() => await roleCollection.find().toArray()
};

export default mainRoleQuery;