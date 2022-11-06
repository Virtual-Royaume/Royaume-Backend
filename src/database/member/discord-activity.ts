import { Prop } from "@typegoose/typegoose";
import { DiscordActivityMessage } from "./discord-activity-message";

export class DiscordActivity {

  @Prop({ required: true })
  public tier!: number;

  @Prop({ required: true })
  public voiceMinute!: number;

  @Prop({ required: true })
  public monthVoiceMinute!: number;

  @Prop({ required: true, _id: false })
  public messages!: DiscordActivityMessage;
}