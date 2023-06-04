import { NestFactory } from "@nestjs/core";
import { AppModule } from "#/app.module";
import { Logger } from "#/utils/console/logger";
import { env } from "#/configs/env";
import { DatabaseService } from "./database/database.service";

async function main(): Promise<void> {
  const app = await NestFactory.create(AppModule, { logger: new Logger() });

  const prismaService = app.get(DatabaseService);
  prismaService.enableShutdownHooks(app);

  await app.listen(env.PORT);
}

void main();