import { Module } from "@nestjs/common";
import { DiscordRoleResolver } from "./discord-role.resolver";
import { DiscordRoleDBModule } from "#/database/discord-role/discord-role.module";

@Module({
  imports: [DiscordRoleDBModule],
  providers: [DiscordRoleResolver]
})
export class DiscordRoleModule {}