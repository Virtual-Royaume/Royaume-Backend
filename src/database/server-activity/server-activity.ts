import { Prop } from "@typegoose/typegoose";

export class ServerActivity {

  // TODO : set default value
  @Prop({ index: true, unique: true, required: true })
  public date!: Date;

  @Prop({ required: true })
  public voiceMinute!: number;

  @Prop({ required: true })
  public messageCount!: number;

  @Prop({ required: true })
  public memberCount!: number;
}