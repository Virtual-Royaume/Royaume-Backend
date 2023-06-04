import { Module } from "@nestjs/common";
import { MainRoleModule } from "./main-roles/main-role.module";

@Module({
  imports: [MainRoleModule]
})
export class APIModule {}