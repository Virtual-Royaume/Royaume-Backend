import { Member, Resolvers } from "../../interfaces/ServerSchema";
import memberCollection, {
    createMember
} from "../../database/collections/Member";
import serverActivityCollection, {
    getServerActivity
} from "../../database/collections/ServerActivity";

const memberMutation: Resolvers["Mutation"] = {
    createMember: async (_, { id, username, profilePicture, isOnServer }) => {
        return await createMember(id, username, profilePicture, isOnServer ?? true) as Member; // 🤮
    },

    updateMember: async (_, { id, input }) => {
        // Remove null properties of input :
        const insertInput = Object.fromEntries(
            Object.entries(input).filter(([, value]) => value !== null)
        );

        // Try to update member :
        try {
            const response = await memberCollection.updateOne({ _id: id }, { $set: insertInput });

            return !!response.modifiedCount;
        } catch {
            return false;
        }
    },

    incMemberDiscordVoiceMinute: async (_, { id }) => {
        try {
            // Increment member voice minute :
            const totalVoiceMinute = (await memberCollection.findOneAndUpdate(
                { _id: id },
                { $inc: { "activity.voiceMinute": 1, "activity.monthVoiceMinute": 1 } }
            )).value?.activity.voiceMinute;

            // Increment server activity voice minute :
            const serverActivity = await getServerActivity();

            serverActivity.voiceMinute++;

            await serverActivityCollection.updateOne(
                { date: serverActivity.date },
                { $set: serverActivity }
            );

            return totalVoiceMinute ?? 0;
        } catch {
            return 0;
        }
    },

    incMemberDiscordActivityChannel: async (_, { id, channelId }) => {
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
            const totalMessageCount = (await memberCollection.findOneAndUpdate(
                { _id: id },
                {
                    $inc: {
                        "activity.messages.totalCount": 1,
                        "activity.messages.monthCount": 1
                    }
                }
            )).value?.activity.messages.totalCount;

            // Increment server activity message count :
            const serverActivity = await getServerActivity();

            serverActivity.messageCount++;

            await serverActivityCollection.updateOne(
                { date: serverActivity.date },
                { $set: serverActivity }
            );

            return totalMessageCount ?? 0;
        } catch {
            return 0;
        }
    }
};

export default memberMutation;