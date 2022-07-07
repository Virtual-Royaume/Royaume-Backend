import database from "../Database";
import tier from "../../../resources/config/tier.json";
import { ActivityPoints, TierUpdate } from "../../interfaces/ServerSchema";

export interface ChannelMessageCount {
    channelId: string;
    messageCount: number;
}

export interface DiscordActivity {
    tier: number;
    voiceMinute: number;
    monthVoiceMinute: number;
    messages: {
        totalCount: number;
        monthCount: number;
        perChannel: ChannelMessageCount[];
    };
}

export interface Member {
    _id: string; // Discord ID

    username: string;
    profilePicture: string;

    birthday?: Date;

    isOnServer: boolean;

    activity: DiscordActivity;
}

const memberCollection = database.collection<Member>("member");
export default memberCollection;

// FUNCTIONS //

export async function createMember(
    id: string,
    username: string,
    profilePicture: string,
    isOnServer = true
): Promise<Member | null> {
    try {
        const member = {
            _id: id,

            username: username,
            profilePicture: profilePicture,

            birthday: undefined,

            isOnServer: isOnServer,

            activity: {
                tier: tier.min,
                voiceMinute: 0,
                monthVoiceMinute: 0,
                messages: {
                    totalCount: 0,
                    monthCount: 0,
                    perChannel: []
                }
            }
        };

        await memberCollection.insertOne(member);

        return member;
    } catch {
        return null;
    }
}

export async function getMemberByDiscordId(id: string): Promise<Member | null> {
    return await memberCollection.findOne({ _id: id });
}

export async function getMembersWithPoints(): Promise<{ _id: string, points: ActivityPoints }[]> {
    function getActivityPoints(messageCount: number, voiceMinute: number) : number {
        return messageCount * 6 + voiceMinute;
    }

    const members = (await memberCollection.find({ isOnServer: true }).toArray()).sort((a, b) => {
        const aActivity = getActivityPoints(a.activity.messages.monthCount, a.activity.monthVoiceMinute);
        const bActivity = getActivityPoints(b.activity.messages.monthCount, b.activity.monthVoiceMinute);

        return aActivity < bActivity ? 1 : -1;
    });

    const up = members.slice(0, Math.floor(members.length * tier.upDownPercent / 100));
    const down = members.slice(members.length - Math.floor(members.length * tier.upDownPercent / 100), members.length);

    return members.map(member => {
        const memberWithPoints = {
            _id: member._id,
            points: {
                count: getActivityPoints(member.activity.messages.monthCount, member.activity.monthVoiceMinute),
                progress: TierUpdate.Neutral
            }
        };

        if (up.find(uppingMember => uppingMember._id === member._id)) memberWithPoints.points.progress = TierUpdate.Up;
        if (down.find(downingMember => downingMember._id === member._id)) memberWithPoints.points.progress = TierUpdate.Down;

        return memberWithPoints;
    });
}