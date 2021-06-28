import mongoose from "mongoose";

export default abstract class Model {

    public readonly name: string;
    public readonly schema: mongoose.Schema;
    public readonly model: mongoose.Model<any, any, any>;

    constructor(name: string, schema: mongoose.Schema){
        this.name = name;
        this.schema = schema;
        this.model = mongoose.model(this.name, this.schema);
    }
}