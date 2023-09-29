"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cors_1 = __importDefault(require("cors"));
var dotenv_1 = __importDefault(require("dotenv"));
var express_1 = __importDefault(require("express"));
var middlewares_1 = require("./middlewares/");
var utils_1 = require("./utils");
var PORT = process.env.PORT || 2800;
var app = (0, express_1.default)();
dotenv_1.default.config();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(middlewares_1.rateLimiter);
app.use(middlewares_1.notFound);
app.use("/api/test", function (req, res) {
    res.status(200).json({ message: "Hello World 🚀" });
});
app.use(middlewares_1.errorHandeler);
app.listen(PORT, function () {
    console.log("Server running on port ".concat(PORT));
    (0, utils_1.connectToDb)();
});
