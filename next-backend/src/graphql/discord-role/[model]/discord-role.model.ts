import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class DiscordRole {

  @Field()
  public roleId!: string;

  @Field()
  public category!: string;

}