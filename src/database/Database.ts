import { MongoClient } from "mongodb";

console.log(process.env.MONGO_URL); // TODO : remove this
if (!process.env.MONGO_URL) throw new Error("The environment variable MONGO_URL is missing");

const client = new MongoClient(process.env.MONGO_URL);

client.connect();

export const database = client.db("royaume");