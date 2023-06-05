import { Module } from "@nestjs/common";
import { DiscordChannelResolver } from "./discord-channel.resolver";

@Module({
  providers: [DiscordChannelResolver]
})
export class DiscordChannelModule {}