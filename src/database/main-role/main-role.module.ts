import { TypegooseModule } from "@m8a/nestjs-typegoose";
import { Module } from "@nestjs/common";
import { MainRole } from "./main-role.entity";
import { MainRoleService } from "./main-role.service";

@Module({
  providers: [MainRoleService],
  imports: [TypegooseModule.forFeature([MainRole])],
  exports: [MainRoleService]
})
export class MainRoleModule {}