import { Module } from "@nestjs/common";
import { DiscordRoleResolver } from "./discord-role.resolver";
import { DatabaseModule } from "#/database";

@Module({
  imports: [DatabaseModule],
  providers: [DiscordRoleResolver]
})
export class DiscordRoleModule {}