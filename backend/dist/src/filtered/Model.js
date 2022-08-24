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
exports.regionalModel = exports.witelModel = exports.sektorModel = void 0;
const mongo = __importStar(require("mongoose"));
const sektorSchema = new mongo.Schema({
    //rata_rata: {type: Number, required: true},
    name: { type: String, required: true },
    //jumblah: {type: Number, required: true}
});
const sektorModel = mongo.model("sektor1", sektorSchema);
exports.sektorModel = sektorModel;
const witelSchema = new mongo.Schema({
    //rata_rata: {type: Number, required: true},
    name: { type: String, required: true },
    sektor: { type: Array },
    //jumblah: { type: Number, required: true}
});
const witelModel = mongo.model("witel1", witelSchema);
exports.witelModel = witelModel;
const regionalSchema = new mongo.Schema({
    //rata_rata: {type: Number, required: true},
    name: { type: String, required: true },
    witel: { type: Array },
    //jumblah: {type: Number, required: true}
});
const regionalModel = mongo.model("regional1", regionalSchema);
exports.regionalModel = regionalModel;
