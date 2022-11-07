import { dayJS } from "$utils/day-js";
import { ModelOptions, Prop } from "@typegoose/typegoose";

@ModelOptions({ schemaOptions: { collection: "serveractivity" } })
export class ServerActivity {

  @Prop({ index: true, unique: true, default: dayJS().utc().toDate() })
  public date!: Date;

  @Prop({ required: true })
  public voiceMinute!: number;

  @Prop({ required: true })
  public messageCount!: number;

  @Prop({ required: true })
  public memberCount!: number;
}