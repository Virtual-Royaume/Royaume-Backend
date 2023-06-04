import { NestFactory } from "@nestjs/core";
import { AppModule } from "#/app.module";
import { Logger } from "#/utils/console/logger";
import { env } from "#/configs/env";

async function main(): Promise<void> {
  const app = await NestFactory.create(AppModule, { logger: new Logger() });

  await app.listen(env.PORT);
}

void main();