import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
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

  // Use validator pipe:
  app.useGlobalPipes(new ValidationPipe());

  // Listen:
  await app.listen(env.PORT);
}

void main();