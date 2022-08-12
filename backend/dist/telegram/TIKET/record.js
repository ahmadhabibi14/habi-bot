"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.discardRecord = exports.saveRecord = exports.SubmitData = void 0;
const Service_1 = require("../../src/teknisi/Service");
const bot_1 = require("../bot");
let submitData;
function SubmitData(value) {
    submitData = value;
}
exports.SubmitData = SubmitData;
function saveRecord() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!submitData) {
            return false;
        }
        switch (submitData.nama) {
            case "regular":
                let Task = {
                    type: submitData.nama,
                    no_insiden: submitData.insiden,
                    no_speedy: submitData.speedy,
                    nama_pelanggan: submitData.nama_pelangan,
                    perbaikan: submitData.repair,
                    point: 1
                };
                console.log(bot_1.telegramId);
                if (!bot_1.telegramId) {
                    return false;
                }
                if (yield (0, Service_1.updateHandle)(Task, bot_1.telegramId.toString())) {
                    return true;
                }
                return false;
                break;
            default:
                break;
        }
        return true;
    });
}
exports.saveRecord = saveRecord;
function discardRecord() {
    if (!submitData) {
        return false;
    }
    submitData = "";
    return true;
}
exports.discardRecord = discardRecord;
