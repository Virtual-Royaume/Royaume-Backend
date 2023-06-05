import type { INestApplication } from "@nestjs/common";
import type { TestingModule } from "@nestjs/testing";
import { AppModule } from "#/app.module";
import { Test } from "@nestjs/testing";
import { beforeAll, afterAll } from "vitest";

let app: INestApplication;

beforeAll(async() => {
  const moduleRef: TestingModule = await Test.createTestingModule({
    imports: [AppModule]
  }).compile();

  app = moduleRef.createNestApplication();

  await app.init();
});

afterAll(async() => {
  await app.close();
});