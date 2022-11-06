import { getModelForClass } from "@typegoose/typegoose";
import { Member } from "./member";

export const memberModel = getModelForClass(Member);