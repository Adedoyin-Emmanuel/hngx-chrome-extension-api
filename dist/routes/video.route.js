"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var controllers_1 = __importDefault(require("../controllers"));
var videoRouter = express_1.default.Router();
videoRouter.post("/upload", controllers_1.default.uploadVideo);
videoRouter.get("/", controllers_1.default.getAllVideos);
videoRouter.get("/:id", controllers_1.default.getVideoById);
videoRouter.delete("/:id", controllers_1.default.deleteVideo);
exports.default = videoRouter;
