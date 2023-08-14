-- CreateTable
CREATE TABLE "DiscordChannel" (
    "channelId" TEXT NOT NULL,
    "category" TEXT NOT NULL,

    CONSTRAINT "DiscordChannel_pkey" PRIMARY KEY ("channelId")
);

-- CreateTable
CREATE TABLE "DiscordRole" (
    "roleId" TEXT NOT NULL,
    "category" TEXT NOT NULL,

    CONSTRAINT "DiscordRole_pkey" PRIMARY KEY ("roleId")
);
