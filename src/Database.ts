import { existsSync, readFileSync } from "fs";
import mongoose from "mongoose";
import SchemaManager from "./model/ModelManager";

export default class Database {

    public static readonly database: Database;

    private sManager: SchemaManager;

    constructor(){
        // Check if connection informations exist :
        if(!existsSync(__dirname + "/../resources/mongodb.json")){
            throw new Error("You need to make a copy of _mongodb.json without the underscore and fill in the missing elements.");
        }

        // Save self instance :
        (this as any).database = this;
    }

    public async connect(){
        const connectInfo = JSON.parse(readFileSync(__dirname + "/../resources/mongodb.json", {encoding: "utf-8"}));

        mongoose.set("useNewUrlParser", true);
        mongoose.set("useFindAndModify", false);
        mongoose.set("useUnifiedTopology", true);
        mongoose.set("useCreateIndex", true);

        await mongoose.connect(
            "mongodb://" + 
            connectInfo.username + ":" + connectInfo.password + 
            "@" + connectInfo.host + ":" + connectInfo.port +
            "/" + connectInfo.database
        );

        this.sManager = new SchemaManager();
    }

    public get schemaManager(){
        if(!this.sManager) throw new Error("You must first use the Database.connect() method to use the database.");

        return this.sManager;
    }
}

(new Database()).connect();