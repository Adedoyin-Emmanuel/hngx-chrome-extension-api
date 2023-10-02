"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const joi_1 = __importDefault(require("joi"));
const openai_1 = __importDefault(require("openai"));
const path_1 = __importDefault(require("path"));
const models_1 = __importDefault(require("../models"));
const utils_1 = require("../utils");
class VideoController {
    static startStream(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const videoBlob = (_a = req === null || req === void 0 ? void 0 : req.files["blob"][0]) === null || _a === void 0 ? void 0 : _a.buffer;
            const videoBlobId = (_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.videoId;
            if (typeof videoBlob === "undefined" ||
                typeof videoBlobId === "undefined") {
                console.log("stream is missing");
                return (0, utils_1.response)(res, 400, "Stream is missing");
            }
            //check if the video exists
            const checkVideo = yield models_1.default.findOne({ videoId: videoBlobId });
            //create the video for reference
            if (!checkVideo) {
                yield models_1.default.create({
                    videoId: videoBlobId,
                });
            }
            const fileName = `${videoBlobId}.webm`;
            const uploadDir = path_1.default.join(__dirname, "..", "/uploads");
            const videoFilePath = `${uploadDir}/${fileName}`;
            if (!fs_1.default.existsSync(videoFilePath)) {
                fs_1.default.writeFileSync(videoFilePath, "");
            }
            const videoBlobStream = fs_1.default.createWriteStream(videoFilePath);
            videoBlobStream.write(videoBlob);
            console.log(`Stream started...`);
            return (0, utils_1.response)(res, 200, "Video streaming started successfully");
        });
    }
    static EndStream(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //const videoBlobId = req?.params?.videoId;
            const requestSchema = joi_1.default.object({
                id: joi_1.default.string().required(),
            });
            const videoTitle = req.query.videoTitle || "Test video";
            console.log(req.query);
            const { error, value } = requestSchema.validate(req.params);
            if (error)
                console.log(error.details[0].message);
            if (error)
                return (0, utils_1.response)(res, 400, error.details[0].message);
            const dbVideo = yield models_1.default.findOne({ videoId: value.id });
            if (!dbVideo)
                return (0, utils_1.response)(res, 404, "video not found");
            const fileName = `${value.id}.webm`;
            const uploadDir = path_1.default.join(__dirname, "..", "/uploads");
            const videoFilePath = `${uploadDir}/${fileName}`;
            if (!fs_1.default.existsSync(videoFilePath)) {
                console.log("Stream doesn't exist");
                return (0, utils_1.response)(res, 404, "Stream does not exist");
            }
            //other processing
            const readFile = fs_1.default.createReadStream(videoFilePath);
            const OpenAi = new openai_1.default({
                apiKey: process.env.OPEN_AI_API_KEY,
            });
            const transcriptionParams = {
                file: readFile,
                model: "whisper-1",
            };
            try {
                const aiTranscript = yield OpenAi.audio.transcriptions.create(transcriptionParams);
                const transcript = aiTranscript === null || aiTranscript === void 0 ? void 0 : aiTranscript.text;
                const title = videoTitle;
                console.log(transcript);
                const dataToStore = {
                    title,
                    transcript,
                    url: `/assets/${fileName}/`,
                };
                // update the data in the database
                const dbResponse = yield models_1.default.findOneAndUpdate({ videoId: value.id }, dataToStore, { new: true });
                if (!dbResponse)
                    return (0, utils_1.response)(res, 404, "Video not found");
                console.log(dbResponse);
                return (0, utils_1.response)(res, 200, "Video stream successful", dbResponse);
            }
            catch (error) {
                console.error("Error:", error);
                return (0, utils_1.response)(res, 500, `Video stream failed ${error}`);
            }
        });
    }
    static getAllVideos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataFromDb = yield models_1.default.find();
            return (0, utils_1.response)(res, 200, "Videos fetched successfully", dataFromDb);
        });
    }
    static getVideoById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const requestSchema = joi_1.default.object({
                id: joi_1.default.string().required(),
            });
            const { error, value } = requestSchema.validate(req.params);
            if (error)
                return (0, utils_1.response)(res, 400, error.details[0].message);
            const dataFromDb = yield models_1.default.findById(value.id);
            if (!dataFromDb)
                return (0, utils_1.response)(res, 404, "Video not found");
            return (0, utils_1.response)(res, 200, "Video fetched successfully", dataFromDb);
        });
    }
    static deleteVideo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const requestSchema = joi_1.default.object({
                id: joi_1.default.string().required(),
            });
            const { error, value } = requestSchema.validate(req.params);
            if (error)
                return (0, utils_1.response)(res, 400, error.details[0].message);
            const dataFromDb = yield models_1.default.findByIdAndDelete(value.id);
            if (!dataFromDb)
                return (0, utils_1.response)(res, 404, "Video not found");
            return (0, utils_1.response)(res, 200, "Video deleted successfully");
        });
    }
}
exports.default = VideoController;
