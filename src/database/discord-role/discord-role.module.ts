import { Module } from "@nestjs/common";
import { DatabaseService } from "../database.service";
import { DiscordRoleDBService } from "./discord-role.service";

@Module({
  providers: [DatabaseService, DiscordRoleDBService],
  exports: [DatabaseService, DiscordRoleDBService]
})
export class DiscordRoleDBModule {}