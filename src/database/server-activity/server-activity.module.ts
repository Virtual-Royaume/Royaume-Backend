import { TypegooseModule } from "@m8a/nestjs-typegoose";
import { Module } from "@nestjs/common";
import { ServerActivity } from "./server-activity.entity";
import { ServerActivityService } from "./server-activity.service";

@Module({
  providers: [ServerActivityService],
  imports: [TypegooseModule.forFeature([ServerActivity])],
  exports: [ServerActivityService]
})
export class ServerActivityModule {}