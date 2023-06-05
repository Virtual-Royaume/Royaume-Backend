import { Module } from "@nestjs/common";
import { DiscordRoleResolver } from "./discord-role.resolver";

@Module({
  providers: [DiscordRoleResolver]
})
export class DiscordRoleModule {}