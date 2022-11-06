import { getNumberEnv } from "$utils/env-variable";
import { isDevEnvironment, isProdEnvironment } from "$utils/environment";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function main() {
  const app = await NestFactory.create(AppModule);

  console.log(isDevEnvironment, isProdEnvironment);
  console.log(process.argv);

  await app.listen(getNumberEnv("PORT"));
}

main();