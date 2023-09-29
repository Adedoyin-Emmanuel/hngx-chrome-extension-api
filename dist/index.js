"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var body_parser_1 = __importDefault(require("body-parser"));
var dotenv_1 = __importDefault(require("dotenv"));
var express_1 = __importDefault(require("express"));
require("express-async-errors");
var morgan_1 = __importDefault(require("morgan"));
var path_1 = __importDefault(require("path"));
var middlewares_1 = require("./middlewares/");
var routes_1 = __importDefault(require("./routes"));
var utils_1 = require("./utils");
var PORT = process.env.PORT || 2800;
var app = (0, express_1.default)();
dotenv_1.default.config();
//middlewares
app.use(body_parser_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(middlewares_1.rateLimiter);
app.use("/assets", express_1.default.static(path_1.default.join(__dirname, "/uploads")));
app.use("/api/video", routes_1.default);
app.use(middlewares_1.notFound);
app.use(middlewares_1.errorHandler);
app.listen(PORT, function () {
    console.log("Server running on port ".concat(PORT));
    (0, utils_1.connectToDb)();
});
