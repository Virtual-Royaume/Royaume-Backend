import mongoose from "../Database";

// Interface, Schema and Model :

export interface MemberChannelsMessageCount {
    general: number,

    games: number,
    musique: number,

    dropShipping: number,
    developpement: number,
    trading: number,
    graphisme: number,
    sneakers: number
}

export interface MemberChannelsMessageCount {
    general: number,

    games: number,
    musique: number,

    dropShipping: number,
    developpement: number,
    trading: number,
    graphisme: number,
    sneakers: number
}

export interface MemberActivity {
    voiceMinute: number,
    messageCount: number,
    monthMessageCount: number,

    channelsMessageCount: MemberChannelsMessageCount
}

interface MemberInterface extends mongoose.Document {
    _id: string,

    username: string,
    profilPictureLink: string,
    alwaysInTheServer: boolean,

    activity: MemberActivity
}

const MemberSchema = new mongoose.Schema({
    _id: {type: String, required: true, maxLength: 35},

    username: {type: String, required: true},
    profilPictureLink: {
        type: String, 
        required: true, 
        validate: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/
    },
    alwaysInTheServer: {type: Boolean, default: true},

    activity: {type: new mongoose.Schema({
        voiceMinute: {type: Number, default: 0},
        messageCount: {type: Number, default: 0},
        monthMessageCount: {type: Number, default: 0},

        channelsMessageCount: {type: new mongoose.Schema({
            general: {type: Number, default: 0},

            games: {type: Number, default: 0},
            musique: {type: Number, default: 0},

            developpement: {type: Number, default: 0},
            trading: {type: Number, default: 0},
            graphisme: {type: Number, default: 0},
            sneakers: {type: Number, default: 0}
        }), default: () => ({})}
    }), default: () => ({})}
});

const collectionName = "member";
const MemberModel = mongoose.model<MemberInterface>(collectionName, MemberSchema, collectionName);

// Functions and other :

async function getMember(id: string): Promise<MemberInterface | null> {
    return await MemberModel.findOne({_id: id});
}

async function createMember(id: string, username: string, profilPictureLink: string): Promise<MemberInterface>{
    return await new MemberModel({
        _id: id, username: username,
        profilPictureLink: profilPictureLink 
    }).save();
}

const channelIDToPropertyName: Record<string, keyof MemberChannelsMessageCount> = {
    "786216771723198514": "general",

    "778044698685866025": "games",
    "829662265942343692": "musique",

    "732392873667854372": "developpement",
    "779129024327712783": "trading",
    "768996501049311243": "graphisme",
    "789126328082235412": "sneakers"
}

// Export default :

export default {
    MemberSchema,
    MemberModel,
    createMember,
    getMember,
    channelIDToPropertyName
}