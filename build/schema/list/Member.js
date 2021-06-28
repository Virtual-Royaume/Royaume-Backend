"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(require("../Schema"));
const mongoose_1 = __importDefault(require("mongoose"));
class Member extends Schema_1.default {
    constructor() {
        super("member", new mongoose_1.default.Schema({}));
    }
}
exports.default = Member;
