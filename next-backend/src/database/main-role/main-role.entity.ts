import { ModelOptions, Prop } from "@typegoose/typegoose";

@ModelOptions({ schemaOptions: { collection: "mainrole" } })
export class MainRole {

  @Prop({ index: true, unique: true, required: true })
  public roleId!: string;

  @Prop({ required: true })
  public category!: string;
}