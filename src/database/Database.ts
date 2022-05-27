import { existsSync, readFileSync } from "fs";
import { MongoClient } from "mongodb";

// Check if connection informations exist :
if (!existsSync(`${__dirname}/../../resources/auth/mongodb.json`)) {
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
    readFileSync(`${__dirname}/../../resources/auth/mongodb.json`, "utf-8")
);

// Connection to the dababase :
const connectLink = {
    normal: `mongodb://${connectInfo.username}:${connectInfo.password}@${connectInfo.host}:${connectInfo.port}/${connectInfo.database}`,
    local: `mongodb://${connectInfo.host}:${connectInfo.port}/${connectInfo.database}`
};

const client = new MongoClient(connectLink.normal);

client.connect();

export default client.db(connectInfo.database);