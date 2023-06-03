import { ModelOptions, Prop } from "@typegoose/typegoose";
import { DiscordChannelType } from "./member-channel-activity.enum";

@ModelOptions({ schemaOptions: { collection: "member.channel-activity" } })
export class MemberChannelActivity {

  @Prop({ required: true, index: true, unique: true })
  public _id!: string;

  @Prop({ required: true, enum: DiscordChannelType })
  public channelType!: DiscordChannelType;

  @Prop({ required: true })
  public channelId!: string;

  @Prop({ default: 0 })
  public count!: number;

  @Prop({ default: 0 })
  public monthCount!: number;
}