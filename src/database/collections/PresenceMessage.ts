import { ObjectId } from "mongodb";
import { PresenceType } from "../../interfaces/ServerSchema";
import database from "../Database";

export interface PresenceMessage {
    _id?: string | ObjectId;

    type: PresenceType;
    text: string;
}

const presenceMessageCollection = database.collection<PresenceMessage>("presencemessage");
export default presenceMessageCollection;