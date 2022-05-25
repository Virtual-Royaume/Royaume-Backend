import { readFileSync } from "fs";
import mysql from "mysql2/promise";
import path from "path";
import memberCollection from "../database/collections/Member.js";
import serverActivityCollection from "../database/collections/ServerActivity.js";

// MySQL Connection :
const mysqlInfo = JSON.parse(
  readFileSync(path.resolve() + "/resources/auth/mysql.json", {
    encoding: "utf-8",
  })
);

const connection = await mysql.createConnection({
  host: mysqlInfo.host,
  user: mysqlInfo.username,
  database: mysqlInfo.database,
  port: mysqlInfo.port,
  password: mysqlInfo.password,
});

// Get MySQL data :
const members: any[] = (
  await connection.execute("SELECT * FROM member")
)[0] as any;
const membersActivity: any[] = (
  await connection.execute("SELECT * FROM member_activity")
)[0] as any;
const serverActivity: any[] = (
  await connection.execute("SELECT * FROM server_activity")
)[0] as any;

// Format MYSQL data for MongoDB :
const insertMembers = members.map((element) => {
  const activity = membersActivity.find((e) => e.userId === element.userId);

  return {
    _id: element.userId,

    username: element.username,
    profilePicture: element.profilePictureLink,

    isOnServer: Boolean(element.alwaysInTheServer),

    activity: {
      voiceMinute: activity.voiceMinute,
      messages: {
        totalCount: activity.totalMessageCount,
        monthCount: activity.monthMessageCount,
        perChannel: [
          {
            channelId: "786216771723198514",
            messageCount: activity.generalMessageCount,
          },
          {
            channelId: "778044698685866025",
            messageCount: activity.gamesMessageCount,
          },
          {
            channelId: "829662265942343692",
            messageCount: activity.musiqueMessageCount,
          },
          {
            channelId: "732392873667854372",
            messageCount: activity.developpementMessageCount,
          },
          {
            channelId: "779129024327712783",
            messageCount: activity.tradingMessageCount,
          },
          {
            channelId: "768996501049311243",
            messageCount: activity.graphismeMessageCount,
          },
        ],
      },
    },
  };
});

const insertServerActivity = serverActivity;

// Reset MongoDB data ?
if (true) {
  memberCollection.deleteMany({});
  serverActivityCollection.deleteMany({});
}

// Insert data in MongoDB from MySQL :
memberCollection.insertMany(insertMembers);
serverActivityCollection.insertMany(insertServerActivity);
