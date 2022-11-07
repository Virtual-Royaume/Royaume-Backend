import { Prop } from "@typegoose/typegoose";
import { ChannelMessageCount } from "./channel-message-count";

export class DiscordActivityMessage {

  @Prop({ default: 0 })
  public totalCount!: number;

  @Prop({ default: 0 })
  public monthCount!: number;

  @Prop({ _id: false, default: [] })
  public perChannel!: ChannelMessageCount[];
}