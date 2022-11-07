import { Injectable } from "@nestjs/common";
import { ReturnModelType } from "@typegoose/typegoose";
import { InjectModel } from "@m8a/nestjs-typegoose";
import { Member } from "./member.entity";

@Injectable()
export class MemberService {

  constructor(
    @InjectModel(Member) private readonly memberModel: ReturnModelType<typeof Member>
  ) {}

  public async findAll(isOnServer = true): Promise<Member[]> {
    return await this.memberModel.find({ isOnServer: isOnServer }).exec();
  }

  public async find(id: string): Promise<Member> {
    return await this.memberModel.findById(id).exec();
  }
}