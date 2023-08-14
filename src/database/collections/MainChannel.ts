import { database } from "$core/database/Database";

export interface MainChannel {
    channelId: string;
    category: string;
}

export const channelCollection = database.collection<MainChannel>("mainchannel");