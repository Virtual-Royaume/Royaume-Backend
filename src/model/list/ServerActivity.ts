import Schema from "../Model";
import mongoose from "mongoose";

export default class ServerActivity extends Schema {

    constructor(){
        super("serveractivity", new mongoose.Schema({
            date: {type: Date, default: new Date(new Date().setHours(0, 0, 0, 0))},
            
            voiceMinute: {type: Number, default: 0},
            messageCount: {type: Number, default: 0},
            memberCount: {type: Number, default: 0}
        }));

        let tgm = this.model;
    }
}