import { MainRoleModule as MainRoleServiceModule } from "#/database/main-role";
import { Module } from "@nestjs/common";
import { MainRoleRevolver } from "./main-role.resolver";

@Module({
  imports: [MainRoleServiceModule],
  providers: [MainRoleRevolver]
})
export class MainRoleModule {}