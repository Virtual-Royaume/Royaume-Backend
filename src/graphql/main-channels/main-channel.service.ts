import { MainChannel } from "$database/main-channel";
import { InjectModel } from "@m8a/nestjs-typegoose";
import { Injectable } from "@nestjs/common";
import { ReturnModelType } from "@typegoose/typegoose";

@Injectable()
export class MainChannelService {

  constructor(
    @InjectModel(MainChannel) private readonly mainChannelModel: ReturnModelType<typeof MainChannel>
  ) {}

  public async findAll(): Promise<MainChannel[]> {
    return await this.mainChannelModel.find().exec();
  }
}