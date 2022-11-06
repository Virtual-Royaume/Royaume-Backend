import { ModelOptions, Prop } from "@typegoose/typegoose";
import { DiscordActivity } from "./discord-activity";

@ModelOptions({ schemaOptions: { collection: "member" } })
export class Member {

  @Prop({ required: true })
  public username!: string;

  @Prop({ required: true })
  public profilePicture!: string;

  @Prop()
  public birthday?: Date;

  @Prop({ required: true })
  public isOnServer!: boolean;

  @Prop({ required: true, _id: false })
  public activity!: DiscordActivity;
}