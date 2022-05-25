import { Resolvers } from "../../interfaces/ServerSchema.js";
import memberCollection, {
	createMember
} from "../../database/collections/Member.js";
import serverActivityCollection, {
	getServerActivity
} from "../../database/collections/ServerActivity.js";

const memberMutation: Resolvers["Mutation"] = {
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
};

export default memberMutation;