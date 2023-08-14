import type { PrimsaTransaction } from "../utils/typing";
import { generateDiscordID } from "../utils/discord";
import { createSet } from "../utils/set";

export async function seedDiscordChannel(prisma: PrimsaTransaction): Promise<Promise<unknown>[]> {
  const promises: Promise<unknown>[] = [];

  const ids = await createSet(generateDiscordID, 30);

  for (let i = 0; i < ids.length; i++) {
    const category = i < ids.length / 2 ? "development" : "graphic";

    const discordChannel = prisma.discordChannel.create({ data: {
      channelId: ids[i],
      category: category
    } });

    promises.push(discordChannel);
  }

  return promises;
}