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

/**
 * @return {boolean} false if the member already exist
 */
async function createMember(
  id: string, username: string, profilPicture: string, 
  isOnServer: boolean = true
) : Promise<boolean> {
  const response = await memberCollection.insertOne({
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
  });

  return response.acknowledged;
}

async function getMemberByDiscordId(id: string) : Promise<Member | null> {
  return await memberCollection.findOne({ _id: id });
}