import { discordActivityTier } from "$config/discord-activity-tier";
import { ModelOptions, Prop, Ref } from "@typegoose/typegoose";
import { MemberChannelActivity } from "./member-channel-activity.entity";
import { MemberInformation } from "./member-information.entity";
import { MemberLinks } from "./member-links.entity";

@ModelOptions({ schemaOptions: { collection: "member" } })
export class Member {

  @Prop({ required: true, index: true, unique: true })
  public _id!: string;

  @Prop({ default: true })
  public isOnServer!: boolean;

  @Prop({ default: discordActivityTier.tierRange.min })
  public activityTier!: number;

  @Prop({ ref: () => MemberInformation, required: true })
  public information!: Ref<MemberInformation>;

  @Prop({ ref: () => MemberLinks, required: true })
  public links!: Ref<MemberLinks>;

  @Prop({ ref: () => MemberChannelActivity, default: [] })
  public channelActivity!: Ref<MemberChannelActivity>[];
}