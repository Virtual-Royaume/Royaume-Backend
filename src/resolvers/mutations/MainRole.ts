import { Resolvers } from "$core/interfaces/ServerSchema";
import { roleCollection } from "$core/database/collections/MainRole";

export const mainRoleMutation: Resolvers["Mutation"] = {
  addRole: async(_, { roleId, category }) => !!(
    await roleCollection.updateOne(
      { roleId },
      { $setOnInsert: { roleId, category } },
      { upsert: true }
    )
  ).upsertedCount,

  removeRole: async(_, { roleId }) => !!(await roleCollection.deleteOne({ roleId })).deletedCount
};