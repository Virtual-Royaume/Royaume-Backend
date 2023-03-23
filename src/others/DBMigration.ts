// @ts-nocheck

import "dotenv/config";
import { channelCollection } from "../database/collections/MainChannel";
import { roleCollection } from "../database/collections/MainRole";
import { memberCollection } from "../database/collections/Member";
import { presenceMessageCollection } from "../database/collections/PresenceMessage";
import { serverActivityCollection } from "../database/collections/ServerActivity";
import { readFileSync } from "fs";
import { ObjectId } from "mongodb";
import { DayJS } from "$core/utils/DayJS";

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
      element.birthday = new Date(`${DayJS(element.birthday.$date).format("YYYY/MM/DD")}Z`);
    } else {
      element.birthday = null;
    }

    return element;
  }));
  await presenceMessageCollection.insertMany(presenceMessage.map(element => { element._id = new ObjectId(element._id.$oid); return element; }));
  await serverActivityCollection.insertMany(serverActivity.map(element => { 
    element._id = new ObjectId(element._id.$oid); 
    element.date = new Date(`${DayJS(element.date.$date).format("YYYY/MM/DD")}Z`);

    return element;
  }));
}

main().then(() => process.exit());