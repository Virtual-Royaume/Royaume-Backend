import { getModelForClass } from "@typegoose/typegoose";
import { PresenceMessage } from "./presence-message";

export const presenceMessageModel = getModelForClass(PresenceMessage);

export { PresenceMessage };