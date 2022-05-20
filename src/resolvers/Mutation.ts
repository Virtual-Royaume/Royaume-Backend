import channelCollection from "../database/collections/MainChannel.js";
import roleCollection from "../database/collections/MainRole.js";
import memberCollection, {
  createMember,
} from "../database/collections/Member.js";
import serverActivityCollection from "../database/collections/ServerActivity.js";
import { getDateWithoutTime } from "../utils/Date.js";
import { Resolvers } from "../interfaces/ServerSchema.js";

const mutation: Resolvers["Mutation"] = {
  // MEMBER :
  createMember: async (_, { id, username, profilPicture, isOnServer }) =>
    await createMember(id, username, profilPicture, isOnServer ?? true),

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

  incMemberDiscordVoiceMinute: async (_, { id }) => {
    try {
      await memberCollection.updateOne(
        { _id: id },
        { $inc: { "activity.voiceMinute": 1 } }
      );

      return true;
    } catch {
      return false;
    }
  },

  incMemberDiscordActivityChannel: async (_, { id, channelId }) => {
    try {
      // Try to update a existing element :
      const result = await memberCollection.findOneAndUpdate(
        { _id: id, "activity.messages.perChannel.channelId": channelId },
        {
          $inc: { "activity.messages.perChannel.$.messageCount": 1 },
        }
      );

      // If element does not exist, push a new element :
      if (!result.value) {
        await memberCollection.findOneAndUpdate(
          { _id: id },
          {
            $push: {
              "activity.messages.perChannel": { channelId, messageCount: 1 },
            },
          }
        );
      }

      // Update total and month message count :
      await memberCollection.updateOne(
        { _id: id },
        {
          $inc: {
            "activity.messages.totalCount": 1,
            "activity.messages.monthCount": 1,
          },
        }
      );

      return true;
    } catch {
      return false;
    }
  },

  // SERVER ACTIVITY :
  updateServerActivity: async (_, { input }) => {
    const serverActivity = await serverActivityCollection.findOne({
      date: getDateWithoutTime(input.date),
    });

    const newData: { [key: string]: any } = {};

    newData.memberCount = input.memberCount ?? serverActivity?.memberCount ?? 0;
    newData.messageCount =
      input.messageCount ?? serverActivity?.messageCount ?? 0;
    newData.voiceMinute = input.voiceMinute ?? serverActivity?.voiceMinute ?? 0;

    try {
      await serverActivityCollection.updateOne(
        { date: input.date },
        { $set: newData },
        { upsert: true }
      );

      return true;
    } catch {
      return false;
    }
  },

  // ROLES :
  addRole: async (_, { roleId, category }) =>
    (
      await roleCollection.updateOne(
        { roleId },
        { $setOnInsert: { roleId, category } },
        { upsert: true }
      )
    ).upsertedCount
      ? true
      : false,
  removeRole: async (_, { roleId }) =>
    (await roleCollection.deleteOne({ roleId })).deletedCount ? true : false,

  // CHANNELS :
  addChannel: async (_, { channelId, category }) =>
    (
      await channelCollection.updateOne(
        { channelId },
        { $setOnInsert: { channelId, category } },
        { upsert: true }
      )
    ).upsertedCount
      ? true
      : false,
  removeChannel: async (_, { channelId }) =>
    (await channelCollection.deleteOne({ channelId })).deletedCount ? true : false,
};

export default mutation;
