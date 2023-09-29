"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = __importDefault(require("config"));
var joi_1 = __importDefault(require("joi"));
var multer_1 = __importDefault(require("multer"));
var uuid_1 = require("uuid");
var models_1 = __importDefault(require("../models"));
var utils_1 = require("../utils");
var VideoController = /** @class */ (function () {
    function VideoController() {
    }
    VideoController.uploadVideo = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var requestSchema, maxVideoSize, uploadedFileName, storage, upload;
            var _this = this;
            return __generator(this, function (_a) {
                requestSchema = joi_1.default.object({
                    title: joi_1.default.string().required().max(100),
                    transcript: joi_1.default.string().required().max(5000),
                });
                maxVideoSize = config_1.default === null || config_1.default === void 0 ? void 0 : config_1.default.get("App.max-video-size");
                uploadedFileName = "";
                storage = multer_1.default.diskStorage({
                    destination: function (req, file, cb) {
                        cb(null, "./uploads/");
                    },
                    filename: function (req, file, cb) {
                        uploadedFileName = (0, uuid_1.v4)() + "-" + file.originalname;
                        cb(null, uploadedFileName);
                    },
                });
                upload = (0, multer_1.default)({
                    storage: storage,
                    limits: { fileSize: maxVideoSize },
                });
                upload.single("video")(req, res, function (err) { return __awaiter(_this, void 0, void 0, function () {
                    var _a, error, value, dataToStore, dbResponse;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _a = requestSchema.validate(req.body), error = _a.error, value = _a.value;
                                if (error)
                                    return [2 /*return*/, (0, utils_1.response)(res, 400, error.details[0].message)];
                                if (err) {
                                    console.log(err);
                                    return [2 /*return*/, (0, utils_1.response)(res, 400, "File upload failed")];
                                }
                                if (!req.file)
                                    return [2 /*return*/, (0, utils_1.response)(res, 400, "File is required")];
                                dataToStore = __assign(__assign({}, value), { url: "".concat(req.get("host"), "/assets/").concat(uploadedFileName) });
                                return [4 /*yield*/, models_1.default.create(dataToStore)];
                            case 1:
                                dbResponse = _b.sent();
                                return [2 /*return*/, (0, utils_1.response)(res, 201, "Video stored successfully", dbResponse)];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    VideoController.getAllVideos = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, (0, utils_1.response)(res, 200, "Getting all videos")];
            });
        });
    };
    VideoController.getVideoById = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, (0, utils_1.response)(res, 200, "Getting one video")];
            });
        });
    };
    VideoController.deleteVideo = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, (0, utils_1.response)(res, 200, "Deleted video successfully")];
            });
        });
    };
    return VideoController;
}());
exports.default = VideoController;
