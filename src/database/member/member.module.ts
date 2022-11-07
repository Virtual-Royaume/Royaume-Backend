import { TypegooseModule } from "@m8a/nestjs-typegoose";
import { Module } from "@nestjs/common";
import { Member } from "./member.entity";
import { MemberService } from "./member.service";

@Module({
  providers: [MemberService],
  imports: [TypegooseModule.forFeature([Member])],
  exports: [MemberService]
})
export class MemberModule {}