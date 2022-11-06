import { ModelOptions, Prop } from "@typegoose/typegoose";
import { PresenceType } from "./presence-message.enum";

@ModelOptions({ schemaOptions: { collection: "presencemessage" } })
export class PresenceMessage {

  @Prop({ required: true, enum: PresenceType })
  public type!: PresenceType;

  @Prop({ required: true })
  public text!: string;
}