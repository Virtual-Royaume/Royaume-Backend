import database from "../Database.js";

export interface MainChannel {
  channelId: string;
  category: string;
}

const channelCollection = database.collection<MainChannel>("mainchannel");
export default channelCollection;
