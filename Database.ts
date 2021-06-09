import { Connection, createConnection } from "typeorm";
import { existsSync } from "fs";
import "reflect-metadata";

class Database {
    
    public static database: Connection;

    constructor(){
        if(!existsSync("./resources/ormconfig.json")){
            throw new Error("You need to make a copy of _ormconfig.json without the underscore and fill in the missing elements.");
        }
    }

    public async connect() : Promise<Connection> {
        const connection = await createConnection(require("./resources/ormconfig.json"));

        (this as any).database = connection;

        return connection;
    }
}

new Database();