import { ModelOptions, Prop } from "@typegoose/typegoose";
import { PresenceMessageType } from "./presence-message.enum";

@ModelOptions({ schemaOptions: { collection: "presencemessage" } })
export class PresenceMessage {

  @Prop({ required: true, enum: PresenceMessageType })
  public type!: PresenceMessageType;

  @Prop({ required: true })
  public text!: string;
}