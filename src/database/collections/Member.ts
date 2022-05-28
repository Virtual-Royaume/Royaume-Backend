import database from "../Database";

export interface ChannelMessageCount {
    channelId: string;
    messageCount: number;
}

export interface DiscordActivity {
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