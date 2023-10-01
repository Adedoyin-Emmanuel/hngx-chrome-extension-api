"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const middlewares_1 = require("./middlewares/");
const routes_1 = __importDefault(require("./routes"));
const utils_1 = require("./utils");
const PORT = process.env.PORT || 2800;
const app = (0, express_1.default)();
//middlewares
app.use(body_parser_1.default.json({ limit: "50mb" }));
app.use((0, morgan_1.default)("dev"));
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(middlewares_1.rateLimiter);
app.use("/assets", express_1.default.static(path_1.default.join(__dirname, "/uploads")));
app.use("/api/video", routes_1.default);
app.use(middlewares_1.notFound);
app.use(middlewares_1.errorHandler);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    (0, utils_1.connectToDb)();
});
