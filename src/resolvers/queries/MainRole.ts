import { Resolvers } from "$core/interfaces/ServerSchema";
import roleCollection from "$core/database/collections/MainRole";

const mainRoleQuery: Resolvers["Query"] = {
    roles: async() => await roleCollection.find().toArray()
};

export default mainRoleQuery;