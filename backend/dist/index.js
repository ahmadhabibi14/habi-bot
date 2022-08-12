"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const router_1 = __importDefault(require("./src/router"));
const bot_1 = __importDefault(require("./telegram/bot"));
const Service_1 = require("./src/db/Service");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
//const screetPath = `/telegraf/${bot.secretPathComponent()}`
//bot.telegram.setWebhook(`${screetPath}`)
const port = 8887;
const app = (0, express_1.default)();
//MongoDb Connect
(0, Service_1.ConnectToMongoDb)();
//app.use(bot.webhookCallback(screetPath))
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use(express_1.default.static("./view"));
app.use(router_1.default);
app.listen(port, () => {
    console.log("your server has running", port);
    bot_1.default.launch();
});
