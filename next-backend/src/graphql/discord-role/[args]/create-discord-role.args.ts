import { ArgsType, Field } from "@nestjs/graphql";
import { MinLength } from "class-validator";

@ArgsType()
export class CreateDiscordRole {

  @Field()
  @MinLength(16)
  public roleId!: string;

  @Field()
  @MinLength(2)
  public category!: string;

}