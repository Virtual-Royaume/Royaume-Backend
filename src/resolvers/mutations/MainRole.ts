import { Resolvers } from "../../interfaces/ServerSchema";
import roleCollection from "../../database/collections/MainRole";

const mainRoleMutation: Resolvers["Mutation"] = {
    addRole: async(_, { roleId, category }) => !!(
        await roleCollection.updateOne(
            { roleId },
            { $setOnInsert: { roleId, category } },
            { upsert: true }
        )
    ).upsertedCount,

    removeRole: async(_, { roleId }) => !!(await roleCollection.deleteOne({ roleId })).deletedCount
};

export default mainRoleMutation;