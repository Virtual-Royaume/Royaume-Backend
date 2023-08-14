import { Module } from "@nestjs/common";
import { DiscordChannelResolver } from "./discord-channel.resolver";
import { DatabaseModule } from "#/database";

@Module({
  imports: [DatabaseModule],
  providers: [DiscordChannelResolver]
})
export class DiscordChannelModule {}