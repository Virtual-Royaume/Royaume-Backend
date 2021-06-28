import { readdirSync } from "fs";
import Schema from "./Model";

export default class SchemaManager {

    public readonly models: Map<string, Schema> = new Map();

    constructor(){
        let listPath = __dirname + "/list/";

        readdirSync(listPath).forEach(schemaFile => {
            const modelPath = listPath + schemaFile;
            const model: Schema = new (require(modelPath).default);

            this.models.set(model.name, model);
        });
    }
}