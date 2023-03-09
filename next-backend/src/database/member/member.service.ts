import { Injectable } from "@nestjs/common";
import { ReturnModelType } from "@typegoose/typegoose";
import { InjectModel } from "@m8a/nestjs-typegoose";
import { Member } from "./member.entity";
import { MemberChannelActivity } from "./member-channel-activity.entity";
import { MemberInformation } from "./member-information.entity";
import { MemberLinks } from "./member-links.entity";

@Injectable()
export class MemberService {

  constructor(
    @InjectModel(Member) private readonly memberModel: ReturnModelType<typeof Member>,
    @InjectModel(MemberChannelActivity) private readonly memberChannelActivity: ReturnModelType<typeof MemberChannelActivity>,
    @InjectModel(MemberInformation) private readonly memberInformation: ReturnModelType<typeof MemberInformation>,
    @InjectModel(MemberLinks) private readonly memberLinks: ReturnModelType<typeof MemberLinks>
  ) {}

  public async findAll(isOnServer = true): Promise<Member[]> {
    return await this.memberModel.find({ isOnServer: isOnServer }).exec();
  }

  public async find(id: string): Promise<Member> {
    return await this.memberModel.findById(id).exec();
  }
}