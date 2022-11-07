import { tierConfig } from "$config/tier";
import { Prop } from "@typegoose/typegoose";
import { DiscordActivityMessage } from "./discord-activity-message";

export class DiscordActivity {

  @Prop({ default: tierConfig.min })
  public tier!: number;

  @Prop({ default: 0 })
  public voiceMinute!: number;

  @Prop({ default: 0 })
  public monthVoiceMinute!: number;

  @Prop({ _id: false })
  public messages!: DiscordActivityMessage;
}