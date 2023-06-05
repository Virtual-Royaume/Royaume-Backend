import { Module } from "@nestjs/common";
import { DatabaseService } from "./database.service";
import { DiscordRoleService } from "./discord-role";
import { DiscordChannelService } from "./discord-channel";

const services = [
  DatabaseService,
  DiscordRoleService,
  DiscordChannelService
];

@Module({
  imports: services,
  exports: services
})
export class DatabaseModule {}