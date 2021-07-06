import { existsSync, readFileSync } from "fs";
import mongoose from "mongoose";

// Check if connection informations exist :
if(!existsSync(__dirname + "/../resources/mongodb.json")){
    throw new Error("You need to make a copy of _mongodb.json without the underscore and fill in the missing elements.");
}

// Connect to database :
const connectInfo = JSON.parse(readFileSync(__dirname + "/../resources/mongodb.json", {encoding: "utf-8"}));

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useUnifiedTopology", true);
mongoose.set("useCreateIndex", true);

mongoose.connect(
    "mongodb://" + 
    connectInfo.username + ":" + connectInfo.password + 
    "@" + connectInfo.host + ":" + connectInfo.port +
    "/" + connectInfo.database
);

export default mongoose;