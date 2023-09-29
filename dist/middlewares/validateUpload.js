"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var utils_1 = require("./../utils");
var validateUpload = function (req, res, next) {
    var requestSchema = joi_1.default.object({
        title: joi_1.default.string().required().max(100),
        transcript: joi_1.default.string().required().max(5000),
    });
    var _a = requestSchema.validate(req.body), error = _a.error, value = _a.value;
    if (error) {
        return (0, utils_1.response)(res, 400, error.details[0].message);
    }
    else {
        console.log("moving to the next");
        next();
    }
};
exports.default = validateUpload;
