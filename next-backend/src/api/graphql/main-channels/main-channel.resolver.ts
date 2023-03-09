import { MainChannelService } from "$database/main-channel";
import { Query, Resolver } from "@nestjs/graphql";
import { MainChannel } from "./main-channel.model";

@Resolver(() => MainChannel)
export class MainChannelRevolver {

  constructor(
    private readonly mainChannelService: MainChannelService
  ) {}

  @Query(() => [MainChannel])
  async channels(): Promise<MainChannel[]> {
    return await this.mainChannelService.findAll();
  }
}