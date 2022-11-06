import { ModelOptions, Prop } from "@typegoose/typegoose";

@ModelOptions({ schemaOptions: { collection: "serveractivity" } })
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