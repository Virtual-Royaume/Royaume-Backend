import "dotenv/config";
import { channelCollection } from "../database/collections/MainChannel";
import { roleCollection } from "../database/collections/MainRole";
import { memberCollection } from "../database/collections/Member";
import { presenceMessageCollection } from "../database/collections/PresenceMessage";
import { serverActivityCollection } from "../database/collections/ServerActivity";
import { readFileSync } from "fs";
import { ObjectId } from "mongodb";

// DB save path :
const dbSavePath = `${__dirname}/../../dbsave/`;

// Collections :
const mainChannel = JSON.parse(readFileSync(`${dbSavePath}/mainchannel.json`, { encoding: "utf-8" }));
const mainRole = JSON.parse(readFileSync(`${dbSavePath}/mainrole.json`, { encoding: "utf-8" }));
const member = JSON.parse(readFileSync(`${dbSavePath}/member.json`, { encoding: "utf-8" }));
const presenceMessage = JSON.parse(readFileSync(`${dbSavePath}/presencemessage.json`, { encoding: "utf-8" }));
const serverActivity = JSON.parse(readFileSync(`${dbSavePath}/serveractivity.json`, { encoding: "utf-8" }));

// Insert data :
async function main(): Promise<void> {
  await channelCollection.insertMany(mainChannel.map(element => { element._id = new ObjectId(element._id.$oid); return element; }));
  await roleCollection.insertMany(mainRole.map(element => { element._id = new ObjectId(element._id.$oid); return element; }));
  await memberCollection.insertMany(member.map(element => { 
    if (element.birthday) {
      element.birthday = element.birthday.$date;
    } else {
      element.birthday = null;
    }

    return element;
  }));
  await presenceMessageCollection.insertMany(presenceMessage.map(element => { element._id = new ObjectId(element._id.$oid); return element; }));
  await serverActivityCollection.insertMany(serverActivity.map(element => { 
    element._id = new ObjectId(element._id.$oid); 
    element.date = element.date.$date;

    return element;
  }));
}

main().then(() => process.exit());