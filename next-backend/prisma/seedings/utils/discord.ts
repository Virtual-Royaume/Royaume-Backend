export function generateDiscordID(): string {
  const randomNumber = () => Math.floor(Math.random() * 10);
  let discordID = "";

  while (discordID.length < 18) discordID += randomNumber();

  return discordID;
}