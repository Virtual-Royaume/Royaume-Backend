import { Prop } from "@typegoose/typegoose";

export class MainRole {

  @Prop({ index: true, unique: true, required: true })
  public channelId!: string;

  @Prop({ required: true })
  public category!: string;
}