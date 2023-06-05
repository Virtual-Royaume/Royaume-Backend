import { DiscordRoleDBService } from "#/database/discord-role";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { DiscordRole } from "./[model]/discord-role.model";
import { CreateDiscordRole } from "./[args]/create-discord-role.args";
import { GraphQLError } from "graphql";

@Resolver(() => DiscordRole)
export class DiscordRoleResolver {

  constructor(
    private readonly discordRoleService: DiscordRoleDBService
  ) {}

  @Query(() => [DiscordRole])
  public async roles(): Promise<DiscordRole[]> {
    return await this.discordRoleService.findAll();
  }

  @Mutation(() => DiscordRole)
  public async createRole(@Args() args: CreateDiscordRole): Promise<DiscordRole> {
    const result = await this.discordRoleService.create({
      roleId: args.roleId,
      category: args.category
    });

    if (!result.ok) throw new GraphQLError(result.error.message);

    return result.value;
  }

}