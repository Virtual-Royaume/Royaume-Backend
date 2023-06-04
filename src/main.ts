import { NestFactory } from "@nestjs/core";
import { AppModule } from "#/app.module";
import { Logger } from "#/utility/console/logger";
import { env } from "#/config/env";

async function main(): Promise<void> {
  const app = await NestFactory.create(AppModule, { logger: new Logger() });

  await app.listen(env.PORT);
}

void main();