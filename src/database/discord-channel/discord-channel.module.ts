import { Module } from "@nestjs/common";
import { DatabaseService } from "../database.service";
import { DiscordChannelDBService } from "./discord-channel.service";

@Module({
  providers: [DatabaseService, DiscordChannelDBService],
  exports: [DatabaseService, DiscordChannelDBService]
})
export class DiscordChannelDBModule {}