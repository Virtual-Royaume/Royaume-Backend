import { Module } from "@nestjs/common";
import { DiscordChannelDBModule } from "#/database/discord-channel";
import { DiscordChannelResolver } from "./discord-channel.resolver";

@Module({
  imports: [DiscordChannelDBModule],
  providers: [DiscordChannelResolver]
})
export class DiscordChannelModule {}