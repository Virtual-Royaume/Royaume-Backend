import memberCollection from "../database/collections/Member";
import tier from "../../resources/config/tier.json";

setInterval(async() => {
    const date = new Date();

    if (date.getDate() === 1 && date.getHours() === 0 && date.getMinutes() === 0) {
        // Update member tiers :
        const members = (await memberCollection.find({ isOnServer: true }).toArray()).sort((a, b) => {
            const aActivity = a.activity.messages.monthCount + a.activity.monthVoiceMinute;
            const bActivity = b.activity.messages.monthCount + b.activity.monthVoiceMinute;

            return aActivity < bActivity ? 1 : -1;
        });

        const up = members.slice(0, Math.floor(members.length * tier.upDownPercent / 100));
        const down = members.slice(members.length - Math.floor(members.length * tier.upDownPercent / 100), members.length);

        for (const member of up) {
            if (member.activity.tier !== tier.max) await memberCollection.updateOne({ _id: member._id }, { $inc: { "activity.tier": -1 } });
        }

        for (const member of down) {
            if (member.activity.tier !== tier.min) await memberCollection.updateOne({ _id: member._id }, { $inc: { "activity.tier": 1 } });
        }

        // Reset member activity :
        memberCollection.updateMany({}, { $set: { "activity.messages.monthCount": 0, "activity.monthVoiceMinute": 0 } });
    }
}, 60_000);
