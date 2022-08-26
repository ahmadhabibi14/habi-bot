"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.teknisi = void 0;
const Service_1 = __importDefault(require("./Service"));
function teknisi(req, res) {
    res.send(Service_1.default.hi());
}
exports.teknisi = teknisi;
