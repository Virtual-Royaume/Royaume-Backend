import { getModelForClass } from "@typegoose/typegoose";
import { ServerActivity } from "./server-activity";

export const serverActivityModel = getModelForClass(ServerActivity);