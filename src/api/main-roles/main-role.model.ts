import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class MainRole {

  @Field()
  public roleId!: string;

  @Field()
  public category!: string;

}