import { TypegooseModule } from "@m8a/nestjs-typegoose";
import { Module } from "@nestjs/common";
import { PresenceMessage } from "./presence-message.entity";
import { PresenceMessageService } from "./presence-message.service";

@Module({
  providers: [PresenceMessageService],
  imports: [TypegooseModule.forFeature([PresenceMessage])],
  exports: [PresenceMessageService]
})
export class PresenceMessageModule {}