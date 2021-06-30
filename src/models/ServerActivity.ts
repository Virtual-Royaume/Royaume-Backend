import mongoose, { Document, Schema } from "mongoose";

// Interface, Schema and Model :

export interface ServerActivityInterface extends Document {
    date: Date,

    voiceMinute: number,
    messageCount: number,
    memberCount: number
}

export const ServerActivitySchema = new Schema({
    date: {type: Date, default: new Date(new Date().setHours(0, 0, 0, 0))},
    
    voiceMinute: {type: Number, default: 0},
    messageCount: {type: Number, default: 0},
    memberCount: {type: Number, default: 0}
})

const collectionName = "serveractivity";
export const ServerActivityModel = mongoose.model<ServerActivityInterface>(collectionName, ServerActivitySchema, collectionName);

// Functions :

export async function getServerActivity(){
    let serverActivity = await ServerActivityModel.findOne({
        date: new Date(new Date().setHours(0, 0, 0, 0))
    });

    if(!serverActivity) serverActivity = await new ServerActivityModel().save();

    return serverActivity;
}