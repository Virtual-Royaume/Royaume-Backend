"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
class Schema {
    constructor(name, schema) {
        this.name = name;
        this.schema = schema;
        mongoose_1.default.model(name, schema);
    }
    getSchema() {
        return mongoose_1.default.model(this.name);
    }
}
exports.default = Schema;
