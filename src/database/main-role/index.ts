import { getModelForClass } from "@typegoose/typegoose";
import { MainRole } from "./main-role";

export const mainRoleModel = getModelForClass(MainRole);