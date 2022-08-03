import { writeFileSync, mkdirSync, existsSync } from "node:fs";
import { randomUUID } from "node:crypto";
import { dirname } from "node:path";

const tokenFile = `${__dirname}/../../resources/token.txt`;
const tokenPath = dirname(tokenFile);

if (!existsSync(tokenPath)) mkdirSync(tokenPath);

writeFileSync(tokenFile, randomUUID());

console.log("Token generated in /resources/token.txt file");