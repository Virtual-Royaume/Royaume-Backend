import { Module } from "@nestjs/common";
import { MainRoleModule } from "./main-roles/main-role.module";
import { MainChannelModule } from "./main-channels/main-channel.module";

@Module({
  imports: [MainRoleModule, MainChannelModule]
})
export class APIModule {}