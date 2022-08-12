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
exports.LaporLangsungPerbaikan = exports.LaporLangsungCpPelanggan = exports.LaporLangsungNamaPelanggan = exports.LaporLangsungSpeedy = exports.LaporLangsungIdGenerate = void 0;
const telegraf_1 = require("telegraf");
const Service_1 = require("../../src/teknisi/Service");
exports.LaporLangsungIdGenerate = new telegraf_1.Scenes.BaseScene("LaporLangsungIdGenerate");
exports.LaporLangsungSpeedy = new telegraf_1.Scenes.BaseScene("LaporLangsungSpeedy");
exports.LaporLangsungNamaPelanggan = new telegraf_1.Scenes.BaseScene("LaporLangsungNamaPelanggan");
exports.LaporLangsungCpPelanggan = new telegraf_1.Scenes.BaseScene("LaporLangsungCpPelanggan");
exports.LaporLangsungPerbaikan = new telegraf_1.Scenes.BaseScene("LaporLangsungPerbaikan");
function saveData(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, Service_1.updateHandle)(data, id);
    });
}
const LaporLangsungProperties = {
    type: "LaporLangsung",
    id_generate: "",
    no_speedy: "",
    nama_pelanggan: "",
    cp_pelanggan: "",
    perbaikan: "",
    point: 1
};
exports.LaporLangsungIdGenerate.enter(ctx => {
    ctx.reply("kamu memilih lapor langsung");
    ctx.reply("masukan id generate");
});
exports.LaporLangsungIdGenerate.on("text", (ctx) => {
    if (ctx.update.message) {
        LaporLangsungProperties.id_generate = ctx.update.message.text;
    }
    ctx.scene.enter("LaporLangsungSpeedy");
});
exports.LaporLangsungSpeedy.enter(ctx => {
    ctx.reply("masukan no speedy");
});
exports.LaporLangsungSpeedy.on("text", ctx => {
    if (ctx.update.message) {
        LaporLangsungProperties.no_speedy = ctx.update.message.text;
    }
    ctx.scene.enter("LaporLangsungNamaPelanggan");
});
exports.LaporLangsungNamaPelanggan.enter(ctx => {
    ctx.reply("masukan nama pelanggan");
});
exports.LaporLangsungNamaPelanggan.on("text", ctx => {
    if (ctx.update.message) {
        LaporLangsungProperties.nama_pelanggan = ctx.update.message.text;
    }
    ctx.scene.enter("LaporLangsungCpPelanggan");
});
exports.LaporLangsungCpPelanggan.enter(ctx => {
    ctx.reply("masukan cp pelanggan");
});
exports.LaporLangsungCpPelanggan.on("text", ctx => {
    if (ctx.update.message) {
        LaporLangsungProperties.cp_pelanggan = ctx.update.message.text;
    }
    ctx.scene.enter("LaporLangsungPerbaikan");
});
exports.LaporLangsungPerbaikan.enter(ctx => {
    ctx.reply("masukan cara perbaikan");
});
exports.LaporLangsungPerbaikan.on("text", ctx => {
    if (ctx.update.message) {
        LaporLangsungProperties.perbaikan = ctx.update.message.text;
    }
    ctx.reply("sumary\n" +
        "Id generate : " + LaporLangsungProperties.id_generate + "\n" +
        "No speedy : " + LaporLangsungProperties.no_speedy + "\n" +
        "Cp pelanggan : " + LaporLangsungProperties.cp_pelanggan + "\n" +
        "Nama pelanggan : " + LaporLangsungProperties.nama_pelanggan + "\n" +
        "Perbaikan : " + LaporLangsungProperties.perbaikan + "\n" +
        "Jika sudah benar tekan submit.", {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: "submit", callback_data: "submit" }, { text: "cancel", callback_data: "cancel" }
                ]
            ]
        }
    });
});
exports.LaporLangsungPerbaikan.on("callback_query", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    let id = "";
    if (ctx.callbackQuery.from) {
        id = ctx.callbackQuery.from.id.toString();
    }
    switch (ctx.callbackQuery.data) {
        case "submit":
            yield saveData(id, LaporLangsungProperties);
            yield ctx.reply("saving data...");
            ctx.scene.enter("Close");
            break;
        case "cancel":
            ctx.reply("membatalkan...");
            ctx.scene.enter("Close");
            break;
        default:
            console.log("");
            break;
    }
}));
