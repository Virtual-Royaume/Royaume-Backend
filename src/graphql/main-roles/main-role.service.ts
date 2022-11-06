import { MainRole } from "$database/main-role";
import { Injectable } from "@nestjs/common";
import { ReturnModelType } from "@typegoose/typegoose";
import { InjectModel } from "@m8a/nestjs-typegoose";

@Injectable()
export class MainRoleService {

  constructor(
    @InjectModel(MainRole) private readonly mainRoleModel: ReturnModelType<typeof MainRole>
  ) {}

  public async findAll(): Promise<MainRole[]> {
    return await this.mainRoleModel.find().exec();
  }
}