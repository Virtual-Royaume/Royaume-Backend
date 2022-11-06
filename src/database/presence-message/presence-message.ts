import { Prop } from "@typegoose/typegoose";
import { PresenceType } from "./presence-message.enum";

export class PresenceMessage {

  @Prop({ required: true, enum: PresenceType })
  public type!: PresenceType;

  @Prop({ required: true })
  public text!: string;
}