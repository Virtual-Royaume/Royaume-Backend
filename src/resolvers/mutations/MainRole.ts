import { Resolvers } from "../../interfaces/ServerSchema.js";
import roleCollection from "../../database/collections/MainRole.js";

const mainRoleMutation: Resolvers["Mutation"] = {
    addRole: async(_, { roleId, category }) => {
        return !!(await roleCollection.updateOne(
            { roleId },
            { $setOnInsert: { roleId, category } },
            { upsert: true }
        )
        ).upsertedCount;
    },

    removeRole: async(_, { roleId }) => !!(await roleCollection.deleteOne({ roleId })).deletedCount
};

export default mainRoleMutation;