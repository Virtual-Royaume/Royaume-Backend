import type { INestApplication, OnModuleInit } from "@nestjs/common";
import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {

  public async onModuleInit() {
    await this.$connect();
  }

  public enableShutdownHooks(app: INestApplication): void {
    this.$on("beforeExit", () => void app.close());
  }

}