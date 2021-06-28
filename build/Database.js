"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const mongoose_1 = __importDefault(require("mongoose"));
const SchemaManager_1 = __importDefault(require("./schema/SchemaManager"));
class Database {
    constructor() {
        // Check if connection informations exist :
        if (!fs_1.existsSync(__dirname + "/../resources/mongodb.json")) {
            throw new Error("You need to make a copy of _mongodb.json without the underscore and fill in the missing elements.");
        }
        // Save self instance :
        this.database = this;
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            const connectInfo = JSON.parse(fs_1.readFileSync(__dirname + "/../resources/mongodb.json", { encoding: "utf-8" }));
            yield mongoose_1.default.connect("mongodb://" +
                connectInfo.username + ":" + connectInfo.password +
                "@" + connectInfo.host + ":" + connectInfo.port +
                "/" + connectInfo.database);
            this.sManager = new SchemaManager_1.default();
        });
    }
    get schemaManager() {
        if (!this.sManager)
            throw new Error("You must first use the Database.connect() method to use the database.");
        return this.sManager;
    }
}
exports.default = Database;
new Database();
