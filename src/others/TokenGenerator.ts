import { writeFileSync, mkdirSync, existsSync } from "node:fs";
import { randomUUID } from "node:crypto";
import { dirname } from "node:path";

const tokenFile = `${__dirname}/../../resources/auth/token.txt`;
const tokenPath = dirname(tokenFile);

if (!existsSync(tokenPath)) mkdirSync(tokenPath);

writeFileSync(tokenFile, randomUUID());

console.log("Token generated in resources/auth/token.txt file");