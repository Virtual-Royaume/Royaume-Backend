import { existsSync, readFileSync } from "fs";
import { MongoClient } from "mongodb";
import path from "path";

// Check if connection informations exist :
if (!existsSync(path.resolve() + "/resources/auth/mongodb.json")) {
  throw new Error(
    "You need to make a copy of _mongodb.json without the underscore and fill in the missing elements."
  );
}

// Get connection information :
interface ConnectInfo {
  host: string;
  port: number;

  username: string;
  password: string;

  database: string;
}

const connectInfo: ConnectInfo = JSON.parse(
  readFileSync(path.resolve() + "/resources/auth/mongodb.json", "utf-8")
);

// Connection to the dababase :
const client = new MongoClient(
  `mongodb://${connectInfo.username}:${connectInfo.password}@${connectInfo.host}:${connectInfo.port}/${connectInfo.database}`
);

await client.connect();

export default client.db(connectInfo.database);
