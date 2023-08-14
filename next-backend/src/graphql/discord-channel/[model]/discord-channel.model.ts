import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class DiscordChannel {

  @Field()
  public channelId!: string;

  @Field()
  public category!: string;

}