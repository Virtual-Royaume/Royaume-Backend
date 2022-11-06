import { MainRole } from "$database/main-role";
import { Module } from "@nestjs/common";
import { TypegooseModule } from "@m8a/nestjs-typegoose";
import { MainRoleRevolver } from "./main-role.resolver";
import { MainRoleService } from "./main-role.service";

@Module({
  providers: [MainRoleRevolver, MainRoleService],
  imports: [TypegooseModule.forFeature([MainRole])]
})
export class MainRoleModule {}