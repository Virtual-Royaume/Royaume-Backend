import channelCollection from "../database/collections/MainChannel.js";
import roleCollection from "../database/collections/MainRole.js";
import memberCollection, { createMember } from "../database/collections/Member.js";
import serverActivityCollection, { getServerActivity } from "../database/collections/ServerActivity.js";
import { Resolvers } from "../interfaces/ServerSchema.js";

const mutation: Resolvers["Mutation"] = {
    // MEMBER :
    createMember: async(_, { id, username, profilPicture, isOnServer }) => await createMember(id, username, profilPicture, isOnServer ?? true),

    updateMember: async(_, { id, input }) => {
    // Remove null properties of input :
        const insertInput = Object.fromEntries(
            Object.entries(input).filter(([, value]) => value !== null)
        );

        // Try to update member :
        try {
            await memberCollection.updateOne({ _id: id }, { $set: insertInput });

            return true;
        } catch {
            return false;
        }
    },

    incMemberDiscordVoiceMinute: async(_, { id }) => {
        try {
            // Increment member voice minute :
            await memberCollection.updateOne(
                { _id: id },
                { $inc: { "activity.voiceMinute": 1 } }
            );

            // Increment server activity voice minute :
            const serverActivity = await getServerActivity();

            serverActivity.voiceMinute++;

            await serverActivityCollection.updateOne(
                { date: serverActivity.date },
                { $set: serverActivity }
            );

            return true;
        } catch {
            return false;
        }
    },

    incMemberDiscordActivityChannel: async(_, { id, channelId }) => {
        try {
            // Try to update a existing element :
            const result = await memberCollection.findOneAndUpdate(
                { _id: id, "activity.messages.perChannel.channelId": channelId },
                {
                    $inc: { "activity.messages.perChannel.$.messageCount": 1 }
                }
            );

            // If element does not exist, push a new element :
            if (!result.value) {
                await memberCollection.findOneAndUpdate(
                    { _id: id },
                    {
                        $push: {
                            "activity.messages.perChannel": { channelId, messageCount: 1 }
                        }
                    }
                );
            }

            // Update total and month message count :
            await memberCollection.updateOne(
                { _id: id },
                {
                    $inc: {
                        "activity.messages.totalCount": 1,
                        "activity.messages.monthCount": 1
                    }
                }
            );

            // Increment server activity message count :
            const serverActivity = await getServerActivity();

            serverActivity.messageCount++;

            await serverActivityCollection.updateOne(
                { date: serverActivity.date },
                { $set: serverActivity }
            );

            return true;
        } catch {
            return false;
        }
    },

    // SERVER ACTIVITY :
    setServerActivityMemberCount: async(_, { count }) => {
        const serverActivity = await getServerActivity();

        serverActivity.memberCount = count;

        const result = await serverActivityCollection.updateOne(
            { date: serverActivity.date },
            { $set: serverActivity }
        );

        return result.modifiedCount ? true : false;
    },

    // ROLES :
    addRole: async(_, { roleId, category }) => (
        await roleCollection.updateOne(
            { roleId },
            { $setOnInsert: { roleId, category } },
            { upsert: true }
        )
    ).upsertedCount
        ? true
        : false,
    removeRole: async(_, { roleId }) => (await roleCollection.deleteOne({ roleId })).deletedCount ? true : false,

    // CHANNELS :
    addChannel: async(_, { channelId, category }) => (
        await channelCollection.updateOne(
            { channelId },
            { $setOnInsert: { channelId, category } },
            { upsert: true }
        )
    ).upsertedCount
        ? true
        : false,
    removeChannel: async(_, { channelId }) => (await channelCollection.deleteOne({ channelId })).deletedCount
        ? true
        : false
};

export default mutation;