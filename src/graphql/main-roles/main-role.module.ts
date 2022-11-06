import { MainRole } from "$database/main-role/main-role";
import { Module } from "@nestjs/common";
import { TypegooseModule } from "nestjs-typegoose";
import { MainRoleRevolver } from "./main-role.resolver";
import { MainRoleService } from "./main-role.service";

@Module({
  providers: [MainRoleRevolver, MainRoleService],
  imports: [TypegooseModule.forFeature([MainRole])]
})
export class MainRoleModule {}