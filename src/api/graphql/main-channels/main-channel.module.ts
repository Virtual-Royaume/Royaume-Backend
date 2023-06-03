import { MainChannelModule as MainChannelServiceModule } from "#/database/main-channel";
import { Module } from "@nestjs/common";
import { MainChannelRevolver } from "./main-channel.resolver";

@Module({
  imports: [MainChannelServiceModule],
  providers: [MainChannelRevolver]
})
export class MainChannelModule {}