import type { DiscordChannel, Prisma } from "@prisma/client";
import type { Result } from "rustic-error";
import { Injectable } from "@nestjs/common";
import { DatabaseService } from "../database.service";
import { error, ok, resultify } from "rustic-error";

@Injectable()
export class DiscordChannelService {

  constructor(private db: DatabaseService) {}

  public async findAll(): Promise<DiscordChannel[]> {
    return this.db.discordChannel.findMany();
  }

  public async create(data: Prisma.DiscordChannelCreateInput): Promise<Result<DiscordChannel, Error>> {
    const channel = await resultify(() => this.db.discordChannel.create({ data }));

    if (!channel.ok) return error(Error("This channel ID already exist"));

    return ok(channel.value);
  }

}