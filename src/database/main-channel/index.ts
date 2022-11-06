import { getModelForClass } from "@typegoose/typegoose";
import { MainChannel } from "./main-channel";

export const mainChannelModel = getModelForClass(MainChannel);