import { Injectable } from "@nestjs/common";
import { DatabaseService } from "../database.service";
import type { DiscordRole, Prisma } from "@prisma/client";

@Injectable()
export class DiscordRoleDBService {

  constructor(private db: DatabaseService) {}

  public async findAll(): Promise<DiscordRole[]> {
    return this.db.discordRole.findMany();
  }

  public async create(data: Prisma.DiscordRoleCreateInput): Promise<DiscordRole> {
    return this.db.discordRole.create({ data });
  }

}