"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaderModel = void 0;
const mongo = __importStar(require("mongoose"));
const LeaderSchema = new mongo.Schema({
    NIK: { type: Number, required: true },
    Nama: { type: String, required: true },
    IDTelegram: { type: String, required: true },
    NamaMitra: { type: String, required: true },
    Sektor: { type: String, required: true },
    Witel: { type: String, required: true },
    Regional: { type: String, required: true },
    Password: { type: String, required: true },
});
const LeaderModel = mongo.model('leader', LeaderSchema);
exports.LeaderModel = LeaderModel;
