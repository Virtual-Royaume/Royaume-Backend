import { MongoClient } from "mongodb";

if (!process.env.MONGO_LINK) throw new Error("The environment variable MONGO_LINK is missing");

const client = new MongoClient(process.env.MONGO_LINK);

client.connect();

export const database = client.db("royaume");