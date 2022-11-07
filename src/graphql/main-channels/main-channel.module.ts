import { MainChannel } from "$database/main-channel";
import { TypegooseModule } from "@m8a/nestjs-typegoose";
import { Module } from "@nestjs/common";
import { MainChannelRevolver } from "./main-channel.resolver";
import { MainChannelService } from "./main-channel.service";

@Module({
  providers: [MainChannelRevolver, MainChannelService],
  imports: [TypegooseModule.forFeature([MainChannel])]
})
export class MainChannelModule {}