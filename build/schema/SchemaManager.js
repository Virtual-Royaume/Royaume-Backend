"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
class SchemaManager {
    constructor() {
        this.schemas = new Map();
        let listPath = __dirname + "/list/";
        fs_1.readdirSync(listPath).forEach(schemaFile => {
            const schemaPath = listPath + schemaFile;
            const schema = new (require(schemaPath).default);
            this.schemas.set(schema.name, schema);
        });
    }
}
exports.default = SchemaManager;
