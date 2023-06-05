import type { DiscordRole, Prisma } from "@prisma/client";
import type { Result } from "rustic-error";
import { Injectable } from "@nestjs/common";
import { DatabaseService } from "../database.service";
import { ok } from "rustic-error";
import { error } from "rustic-error";
import { resultify } from "rustic-error";

@Injectable()
export class DiscordRoleService {

  constructor(private db: DatabaseService) {}

  public async findAll(): Promise<DiscordRole[]> {
    return this.db.discordRole.findMany();
  }

  public async create(data: Prisma.DiscordRoleCreateInput): Promise<Result<DiscordRole, Error>> {
    const role = await resultify(() => this.db.discordRole.create({ data }));

    if (!role.ok) return error(Error("This role ID already exist"));

    return ok(role.value);
  }

}