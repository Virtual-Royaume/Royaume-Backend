import { TypegooseModule } from "@m8a/nestjs-typegoose";
import { Module } from "@nestjs/common";
import { MainChannel } from "./main-channel.entity";
import { MainChannelService } from "./main-channel.service";

@Module({
  providers: [MainChannelService],
  imports: [TypegooseModule.forFeature([MainChannel])],
  exports: [MainChannelService]
})
export class MainChannelModule {}