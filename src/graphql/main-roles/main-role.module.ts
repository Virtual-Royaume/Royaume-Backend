import { MainRoleModule as MainRoleServiceModule } from "$database/main-role";
import { Module } from "@nestjs/common";
import { MainRoleRevolver } from "./main-role.resolver";

@Module({
  providers: [MainRoleRevolver, MainRoleServiceModule]
})
export class MainRoleModule {}