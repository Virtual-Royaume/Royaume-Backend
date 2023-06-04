import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { DiscordChannel } from "./[model]/discord-channel.model";
import { CreateDiscordChannel } from "./[args]/create-discord-channel.args";
import { GraphQLError } from "graphql";
import { resultify } from "rustic-error";
import { DiscordChannelDBService } from "#/database/discord-channel";

@Resolver(() => DiscordChannel)
export class DiscordChannelResolver {

  constructor(
    private readonly discordChannelService: DiscordChannelDBService
  ) {}

  @Query(() => [DiscordChannel])
  public async channels(): Promise<DiscordChannel[]> {
    return await this.discordChannelService.findAll();
  }

  @Mutation(() => DiscordChannel)
  public async createChannel(@Args() args: CreateDiscordChannel): Promise<DiscordChannel> {
    const result = await resultify(() => this.discordChannelService.create({
      channelId: args.channelId,
      category: args.category
    }));

    if (!result.ok) throw new GraphQLError("This channel ID already exist");

    return result.value;
  }

}