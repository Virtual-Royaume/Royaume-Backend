import { Prop } from "@typegoose/typegoose";
import { ChannelMessageCount } from "./channel-message-count";

export class DiscordActivityMessage {

  @Prop({ required: true })
  public totalCount!: number;

  @Prop({ required: true })
  public monthCount!: number;

  // TODO : type param is really required ?
  @Prop({ required: true, _id: false, type: () => [ChannelMessageCount] })
  public perChannel!: ChannelMessageCount[];
}