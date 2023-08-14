import type { Prisma, PrismaClient } from "@prisma/client";

export type PrimsaTransaction = Omit<
  PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>,
  "$connect" | "$disconnect" | "$on" | "$transaction" | "$use"
>;