import { Prop } from "@typegoose/typegoose";

export class MainChannel {

  // TODO : remove _id

  @Prop({ index: true, unique: true, required: true })
  public roleId!: string;

  @Prop({ required: true })
  public category!: string;
}