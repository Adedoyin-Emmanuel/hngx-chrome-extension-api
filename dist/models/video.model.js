"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var VideoSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
        max: 100,
    },
    transcript: {
        type: String,
        required: false,
        max: 5000,
    },
    url: {
        type: String,
        required: true,
    },
}, { timestamps: true, versionKey: false });
var VideoModel = mongoose_1.default.model("Video", VideoSchema);
exports.default = VideoModel;
