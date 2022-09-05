import { getDateWithoutTime } from "$core/utils/Date";
import { database } from "$core/database/Database";

export interface ServerActivity {
    date: string;

    voiceMinute: number;
    messageCount: number;
    memberCount: number;
}

export const serverActivityCollection = database.collection<ServerActivity>("serveractivity");

// FUNCTIONS //

export async function getServerActivity(): Promise<ServerActivity> {
    let serverActivity = await serverActivityCollection.findOne({
        date: getDateWithoutTime().format()
    });

    if (!serverActivity) {
        const defaultValue = {
            date: getDateWithoutTime().format(),

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