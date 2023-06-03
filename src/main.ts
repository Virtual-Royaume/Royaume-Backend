import { environmentVariable } from "$config/environment-variable";
import { Logger } from "$utility/console/logger";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function main(): Promise<void> {
  const app = await NestFactory.create(AppModule, { logger: new Logger() });

  await app.listen(environmentVariable().port);
}

main();