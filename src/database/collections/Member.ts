import database from "../Database";
import tier from "../../../resources/config/tier.json";
import { Member as MemberGql, TierUpdate } from "../../interfaces/ServerSchema";
import { WithId } from "mongodb";

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

    birthday: Date | null;

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

            birthday: null,

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

export async function getMembersWithPoints(): Promise<MemberGql[]> {
    const members = (await memberCollection.find({ isOnServer: true }).toArray()).sort((a, b) => {
        const aActivity = a.activity.messages.monthCount + a.activity.monthVoiceMinute;
        const bActivity = b.activity.messages.monthCount + b.activity.monthVoiceMinute;

        return aActivity < bActivity ? 1 : -1;
    });

    const up = members.slice(0, Math.floor(members.length * tier.upDownPercent / 100));
    const down = members.slice(members.length - Math.floor(members.length * tier.upDownPercent / 100), members.length);

    // If other possibility, modify the `as MemberGql[]`
    return (members as MemberGql[]).map(member => {
        member.activity.points = {
            count: member.activity.messages.monthCount + member.activity.monthVoiceMinute,
            progress: TierUpdate.Neutral
        };

        if (up.find(uppingMember => uppingMember._id === member._id)) member.activity.points.progress = TierUpdate.Up;
        if (down.find(downingMember => downingMember._id === member._id)) member.activity.points.progress = TierUpdate.Down;

        return member;
    });
}