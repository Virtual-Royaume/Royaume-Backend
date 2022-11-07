import { Prop } from "@typegoose/typegoose";

export class ChannelMessageCount {

  @Prop({ required: true })
  public channelId!: string;

  @Prop({ required: true })
  public messageCount!: number;
}