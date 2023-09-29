"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var response_1 = __importDefault(require("../utils/response"));
var notFound = function (req, res) {
    return (0, response_1.default)(res, 404, "Route not found");
};
exports.default = notFound;
