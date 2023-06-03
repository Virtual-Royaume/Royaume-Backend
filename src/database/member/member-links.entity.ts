import { ModelOptions, Prop } from "@typegoose/typegoose";

@ModelOptions({ schemaOptions: { collection: "member.links" } })
export class MemberLinks {

  @Prop({ required: true, index: true, unique: true })
  public _id!: string;

  @Prop()
  public portfolio?: string;

  @Prop()
  public github?: string;

  @Prop()
  public twitter?: string;

  @Prop()
  public instagram?: string;

  @Prop()
  public malt?: string;
}