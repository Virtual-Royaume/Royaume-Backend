import mongoose, { Schema, Document } from "mongoose";

export interface IServerActivity extends Document {
    date: Date,

    voiceMinute: number,
    messageCount: number,
    memberCount: number
}

export default mongoose.model<IServerActivity>("ServerActivity", new Schema({
    date: {type: Date, default: new Date(new Date().setHours(0, 0, 0, 0))},
    
    voiceMinute: {type: Number, default: 0},
    messageCount: {type: Number, default: 0},
    memberCount: {type: Number, default: 0}
}));