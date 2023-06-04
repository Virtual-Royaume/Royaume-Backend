import { Module } from "@nestjs/common";
import { DiscordRoleModule } from "./discord-role/discord-role.module";

@Module({
  imports: [DiscordRoleModule]
})
export class GraphQLAPIModule {}