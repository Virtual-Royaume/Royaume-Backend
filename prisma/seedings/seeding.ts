import { PrismaClient } from "@prisma/client";
import { seedDiscordChannel } from "./tables/discord-channel";
import { seedDiscordRole } from "./tables/discord-role";

const prisma = new PrismaClient();

void prisma.$transaction(async(tx) => {
  // Delete all rows of each tables:
  await tx.discordChannel.deleteMany();
  await tx.discordRole.deleteMany();

  // Promises:
  const promises: Promise<unknown>[] = [
    ...(await seedDiscordChannel(tx)),
    ...(await seedDiscordRole(tx))
  ];

  // Execute promises:
  await Promise.all(promises);
}, { timeout: 100_000 }).then(() => prisma.$disconnect());