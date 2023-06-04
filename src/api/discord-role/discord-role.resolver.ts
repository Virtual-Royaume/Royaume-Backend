import { DiscordRoleDBService } from "#/database/discord-role";
import { Mutation, Query, Resolver } from "@nestjs/graphql";
import { DiscordRole } from "./discord-role.model";

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
  public async createRole(): Promise<DiscordRole> {
    return await this.discordRoleService.create({
      roleId: String(Math.ceil(Math.random() * 1000)),
      category: "Test"
    });
  }

}