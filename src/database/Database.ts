import { MongoClient } from "mongodb";

if (!process.env.MONGO_URL2) throw new Error("The environment variable MONGO_URL is missing");

console.log(process.env.MONGO_URL2);
const client = new MongoClient(process.env.MONGO_URL2);

client.connect();

export const database = client.db("royaume");