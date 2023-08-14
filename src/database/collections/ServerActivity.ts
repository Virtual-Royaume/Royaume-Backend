import { getDateWithoutTime } from "$core/utils/Date";
import { database } from "$core/database/Database";

export interface ServerActivity {
    date: Date;

    voiceMinute: number;
    messageCount: number;
    memberCount: number;
}

export const serverActivityCollection = database.collection<ServerActivity>("serveractivity");

serverActivityCollection.createIndex({ date: 1 }, { unique: true });

// FUNCTIONS //

export async function getServerActivity(): Promise<ServerActivity> {
  let serverActivity = await serverActivityCollection.findOne({
    date: new Date(`${getDateWithoutTime().format("YYYY/MM/DD")}Z`)
  });

  if (!serverActivity) {
    const defaultValue = {
      date: new Date(`${getDateWithoutTime().format("YYYY/MM/DD")}Z`),

      voiceMinute: 0,
      messageCount: 0,
      memberCount: 0
    };
    const insert = await serverActivityCollection.insertOne(defaultValue);

    serverActivity = {
      _id: insert.insertedId,
      ...defaultValue
    };
  }

  return serverActivity;
}