"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_rate_limit_1 = require("express-rate-limit");
const config_1 = __importDefault(require("config"));
const rateLimiter = (0, express_rate_limit_1.rateLimit)({
    windowMs: 60 * 1000,
    max: config_1.default.get("App.request-limit"),
    message: {
        code: 429,
        status: "Too many requests",
        message: "Too many requests chief, try again later",
        data: {},
    },
});
exports.default = rateLimiter;
