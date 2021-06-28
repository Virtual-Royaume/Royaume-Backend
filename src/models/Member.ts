import mongoose, { Schema, Document } from "mongoose";

export interface IMember extends Document {
    id: string,

    username: string,
    profilPictureLink: string,
    alwaysInTheServer: boolean,

    activity: {
        voiceMinute: number,
        messageCount: number,
        monthMessageCount: number,

        channelsMessageCount: {
            general: number,

            games: number,
            musique: number,

            dropShipping: number,
            developpement: number,
            trading: number,
            graphisme: number,
            sneakers: number
        }
    }
}

export default mongoose.model<IMember>("Member", new Schema({
    id: {type: String, required: true},

    username: {type: String, required: true},
    profilPictureLink: {
        type: String, 
        required: true, 
        validate: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
    },
    alwaysInTheServer: {type: Boolean, default: true},

    activity: new mongoose.Schema({
        voiceMinute: {type: Number, default: 0},
        messageCount: {type: Number, default: 0},
        monthMessageCount: {type: Number, default: 0},

        channelsMessageCount: new mongoose.Schema({
            general: {type: Number, default: 0},

            games: {type: Number, default: 0},
            musique: {type: Number, default: 0},

            dropShipping: {type: Number, default: 0},
            developpement: {type: Number, default: 0},
            trading: {type: Number, default: 0},
            graphisme: {type: Number, default: 0},
            sneakers: {type: Number, default: 0}
        })
    })
}));