"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const router_1 = __importDefault(require("./src/router"));
const bot_1 = __importDefault(require("./telegram/bot"));
const screetPath = `/telegraf/${bot_1.default.secretPathComponent()}`;
const port = 8888;
const app = (0, express_1.default)();
app.use(bot_1.default.webhookCallback(screetPath));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use(express_1.default.static("./view"));
app.use(router_1.default);
app.listen(port, () => {
    console.log("your server has running", port);
});
