import { ArgsType, Field } from "@nestjs/graphql";
import { MinLength } from "class-validator";

@ArgsType()
export class CreateDiscordChannel {

  @Field()
  @MinLength(16)
  public channelId!: string;

  @Field()
  @MinLength(2)
  public category!: string;

}