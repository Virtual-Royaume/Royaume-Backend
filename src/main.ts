import { environmentVariable } from "$config/environment-variable";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function main(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  await app.listen(environmentVariable().port);
}

main();