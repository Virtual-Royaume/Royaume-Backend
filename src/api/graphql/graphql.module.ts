import { Module } from "@nestjs/common";
import { MainChannelModule } from "./main-channels/main-channel.module";
import { MainRoleModule } from "./main-roles/main-role.module";

@Module({
  imports: [MainRoleModule, MainChannelModule]
})
export class GraphQLMainModule {}