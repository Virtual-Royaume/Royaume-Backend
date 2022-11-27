import { dayJS } from "$utility/day-js";
import { ModelOptions, Prop } from "@typegoose/typegoose";

@ModelOptions({ schemaOptions: { collection: "serveractivity" } })
export class ServerActivity {

  @Prop({ index: true, unique: true, default: dayJS().utc().startOf("day").toDate() })
  public date!: Date;

  @Prop({ default: 0 })
  public voiceMinute!: number;

  @Prop({ default: 0 })
  public messageCount!: number;

  @Prop({ default: 0 })
  public memberCount!: number;
}