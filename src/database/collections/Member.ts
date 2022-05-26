import database from "../Database.js";

export interface ChannelMessageCount {
  channelId: string;
  messageCount: number;
}

export interface DiscordActivity {
  voiceMinute: number; // minutes
  messages: {
    totalCount: number;
    monthCount: number;
    perChannel: ChannelMessageCount[];
  };
}

export interface Member {
  _id: string; // Discord ID

  username: string;
  profilPicture: string;

  isOnServer: boolean;

  activity: DiscordActivity;
}

const memberCollection = database.collection<Member>("member");
export default memberCollection;

// FUNCTIONS //

export async function createMember(
    id: string,
    username: string,
    profilPicture: string,
    isOnServer = true
): Promise<Member | null> {
    try {
        const member = {
            _id: id,

            username: username,
            profilPicture: profilPicture,

            isOnServer: isOnServer,

            activity: {
                voiceMinute: 0,
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