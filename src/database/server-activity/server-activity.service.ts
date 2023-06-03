import { InjectModel } from "@m8a/nestjs-typegoose";
import { Injectable } from "@nestjs/common";
import { ReturnModelType } from "@typegoose/typegoose";
import { ServerActivity } from "./server-activity.entity";

@Injectable()
export class ServerActivityService {

  constructor(
    @InjectModel(ServerActivity) private readonly serverActivityModel: ReturnModelType<typeof ServerActivity>
  ) {}

  public async findAll(history = 30): Promise<ServerActivity[]> {
    return await this.serverActivityModel.find().sort({ date: "desc" }).limit(history).exec();
  }
}