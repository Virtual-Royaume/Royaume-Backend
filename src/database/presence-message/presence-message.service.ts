import { InjectModel } from "@m8a/nestjs-typegoose";
import { Injectable } from "@nestjs/common";
import { ReturnModelType } from "@typegoose/typegoose";
import { PresenceMessage } from "./presence-message.entity";

@Injectable()
export class PresenceMessageService {

  constructor(
    @InjectModel(PresenceMessage) private readonly presenceMessageModel: ReturnModelType<typeof PresenceMessage>
  ) {}

  public async findAll(): Promise<PresenceMessage[]> {
    return await this.presenceMessageModel.find().exec();
  }
}