import { Injectable } from "@nestjs/common";
import { DatabaseService } from "../database.service";
import type { DiscordChannel, Prisma } from "@prisma/client";

@Injectable()
export class DiscordChannelService {

  constructor(private db: DatabaseService) {}

  public async findAll(): Promise<DiscordChannel[]> {
    return this.db.discordChannel.findMany();
  }

  public async create(data: Prisma.DiscordChannelCreateInput): Promise<DiscordChannel> {
    return this.db.discordChannel.create({ data });
  }

}