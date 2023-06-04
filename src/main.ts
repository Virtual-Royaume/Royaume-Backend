import { NestFactory } from "@nestjs/core";
import { AppModule } from "#/app.module";
import { Logger } from "#/utils/console/logger";
import { env } from "#/configs/env";
import { DatabaseService } from "#/database";

async function main(): Promise<void> {
  // Create app:
  const app = await NestFactory.create(AppModule, { logger: new Logger() });

  // Prisma shutdown hook:
  const prismaService = app.get(DatabaseService);
  prismaService.enableShutdownHooks(app);

  // Listen:
  await app.listen(env.PORT);
}

void main();