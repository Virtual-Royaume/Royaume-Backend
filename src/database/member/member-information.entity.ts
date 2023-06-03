import { ModelOptions, Prop } from "@typegoose/typegoose";

@ModelOptions({ schemaOptions: { collection: "member.information" } })
export class MemberInformation {

  @Prop({ required: true, index: true, unique: true })
  public _id!: string;

  @Prop({ required: true })
  public username!: string;

  @Prop({ required: true })
  public profilePicture!: string;

  @Prop()
  public birthday?: Date;

  @Prop()
  public description?: string;

  @Prop({ default: [] })
  public skills!: string[];
}