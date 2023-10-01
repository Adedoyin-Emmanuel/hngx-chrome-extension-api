"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const VideoSchema = new mongoose_1.default.Schema({
    videoId: {
        type: String,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: false,
        max: 100,
    },
    transcript: {
        type: String,
        required: false,
    },
    url: {
        type: String,
        required: false,
    },
}, { timestamps: true, versionKey: false });
const VideoModel = mongoose_1.default.model("Video", VideoSchema);
exports.default = VideoModel;
