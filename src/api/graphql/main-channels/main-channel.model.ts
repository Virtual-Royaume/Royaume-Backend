import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class MainChannel {

  @Field()
  public channelId!: string;

  @Field()
  public category!: string;
}