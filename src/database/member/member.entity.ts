import { ModelOptions, Prop } from "@typegoose/typegoose";
import { DiscordActivity } from "./sub-documents/discord-activity";

@ModelOptions({ schemaOptions: { collection: "member" } })
export class Member {

  @Prop({ required: true })
  public username!: string;

  @Prop({ required: true })
  public profilePicture!: string;

  @Prop()
  public birthday?: Date;

  @Prop({ default: true })
  public isOnServer!: boolean;

  @Prop({ _id: false })
  public activity!: DiscordActivity;
}