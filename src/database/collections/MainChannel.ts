import database from "../Database";

export interface MainChannel {
    channelId: string;
    category: string;
}

const channelCollection = database.collection<MainChannel>("mainchannel");
export default channelCollection;