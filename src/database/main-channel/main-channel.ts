import { ModelOptions, Prop } from "@typegoose/typegoose";

@ModelOptions({ schemaOptions: { collection: "mainchannel" } })
export class MainChannel {

  // TODO : remove _id

  @Prop({ index: true, unique: true, required: true })
  public channelId!: string;

  @Prop({ required: true })
  public category!: string;
}