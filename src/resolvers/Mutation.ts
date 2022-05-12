import roleCollection from "../database/collections/MainRole.js";
import memberCollection, { createMember } from "../database/collections/Member.js";
import serverActivityCollection, { getServerActivity } from "../database/collections/ServerActivity.js";
import { Resolvers } from "../interfaces/GraphQL.js";
import { getDateWithoutTime } from "../utils/Date.js";

const mutation: Resolvers["Mutation"] = {
  // MEMBER :
	createMember: async (_, { id, username, profilPicture, isOnServer }) => await createMember(id, username, profilPicture, isOnServer ?? true),

  updateMember: async (_, { id, input }) => {
    // Remove null properties of input :
    const insertInput = Object.fromEntries(
      Object.entries(input).filter(([_, value]) => value !== null)
    );

    // Try to update member :
    try {
      await memberCollection.updateOne({ _id: id }, { $set: insertInput });

      return true;
    } catch {
      return false;
    }
  },

  updateMemberDiscordActivity: async (_, { id, input }) => {
    const newData: { [key: string]: any } = {}

    if(input.messageMonthCount) newData["activity.messages.monthCount"] = input.messageMonthCount;
    if(input.messageTotalCount) newData["activity.messages.totalCount"] = input.messageTotalCount;
    if(input.voiceMinute) newData["activity.voiceMinute"] = input.voiceMinute;
    
    try {
      await memberCollection.updateOne({ _id: id }, { $set: newData });

      return true;
    } catch {
      return false;
    }
  },
  
  updateMemberDiscordActivityChannel: async (_, { id, channelId, messageCount }) => {
    try {
      // Try to update a existing element :
      const result = await memberCollection.updateOne(
        { _id: id, "activity.messages.perChannel.channelId": channelId }, 
        { $set: { "activity.messages.perChannel.$.messageCount": messageCount } }
      );
        
      // If element does not exist, push a new element :
      if(!result.modifiedCount){
        await memberCollection.updateOne(
          { _id: id }, { $push: { "activity.messages.perChannel": { channelId, messageCount } } }
        );
      }

      return true;
    } catch {
      return false;
    }
  },

  // ROLES :
  addRole: async (_, { roleId, category }) => 
    (await roleCollection.updateOne({ roleId }, { $setOnInsert: { roleId, category } }, { upsert: true })).acknowledged, // function return tjr true
  removeRole: async (_, { roleId }) => (await roleCollection.deleteOne({ roleId })).acknowledged,

  // CHANNELS :
  addChannel: async (_, { channelId, category }) => 
    (await roleCollection.updateOne({ channelId }, { $setOnInsert: { channelId, category } }, { upsert: true })).acknowledged, // function return tjr true
  removeChannel: async (_, { channelId }) => (await roleCollection.deleteOne({ channelId })).acknowledged,
}

export default mutation;