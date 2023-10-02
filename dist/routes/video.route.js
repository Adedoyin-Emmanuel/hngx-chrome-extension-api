"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const controllers_1 = __importDefault(require("../controllers"));
const tempStorage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage: tempStorage });
const videoRouter = express_1.default.Router();
//stream endpoint
videoRouter.post("/stream", upload.fields([{ name: "blob" }, { name: "videoId" }]), controllers_1.default.startStream);
//end stream
videoRouter.get("/stream/end/:id", controllers_1.default.EndStream);
videoRouter.get("/", controllers_1.default.getAllVideos);
videoRouter.get("/:id", controllers_1.default.getVideoById);
videoRouter.delete("/:id", controllers_1.default.deleteVideo);
exports.default = videoRouter;
