import memberCollection, { getMembersWithPoints } from "../database/collections/Member";
import tier from "../../resources/config/tier.json";
import { TierUpdate } from "../interfaces/ServerSchema";

setInterval(async() => {
    const date = new Date();

    if (date.getDate() === 1 && date.getHours() === 0 && date.getMinutes() === 0) {
        // Update member tiers :
        const members = await getMembersWithPoints();

        for (const member of members) {
            if (member.activity.points.progress === TierUpdate.Up) {
                if (member.activity.tier !== tier.max) {
                    await memberCollection.updateOne({ _id: member._id }, { $inc: { "activity.tier": -1 } });
                }

                continue;
            }

            if (member.activity.points.progress === TierUpdate.Down) {
                if (member.activity.tier !== tier.min) {
                    await memberCollection.updateOne({ _id: member._id }, { $inc: { "activity.tier": 1 } });
                }

                continue;
            }
        }

        // Reset member activity :
        memberCollection.updateMany({}, { $set: { "activity.messages.monthCount": 0, "activity.monthVoiceMinute": 0 } });
    }
}, 60_000);