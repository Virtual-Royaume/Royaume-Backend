import { MainRoleService } from "$database/main-role";
import { Query, Resolver } from "@nestjs/graphql";
import { MainRole } from "./main-role.model";

@Resolver(() => MainRole)
export class MainRoleRevolver {

  constructor(
    private readonly mainRoleService: MainRoleService
  ) {}

  @Query(() => [MainRole])
  async roles(): Promise<MainRole[]> {
    return await this.mainRoleService.findAll();
  }
}