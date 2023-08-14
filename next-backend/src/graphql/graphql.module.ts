import { Module } from "@nestjs/common";
import { DiscordRoleModule } from "./discord-role/discord-role.module";
import { DiscordChannelModule } from "./discord-channel/discord-channel.module";

@Module({
  imports: [DiscordRoleModule, DiscordChannelModule]
})
export class GraphQLAPIModule {}