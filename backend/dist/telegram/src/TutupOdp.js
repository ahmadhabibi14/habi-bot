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
exports.TutupODPAlamatOdp = exports.TutupODPNamaOdp = exports.TutupODPIdGenerate = void 0;
const telegraf_1 = require("telegraf");
const Service_1 = require("../../src/teknisi/Service");
exports.TutupODPIdGenerate = new telegraf_1.Scenes.BaseScene("TutupODPIdGenerate");
exports.TutupODPNamaOdp = new telegraf_1.Scenes.BaseScene("TutupODPNamaOdp");
exports.TutupODPAlamatOdp = new telegraf_1.Scenes.BaseScene("TutupODPAlamatOdp");
function saveData(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, Service_1.updateHandle)(data, id);
    });
}
const TutupODPProperties = {
    type: "TutupODP",
    id_generate: "",
    nama_odp: "",
    alamat_odp: "",
    point: 0.25
};
exports.TutupODPIdGenerate.enter(ctx => {
    ctx.reply("kamu melilih Tutup ODP");
    ctx.reply("masukan id generate");
});
exports.TutupODPIdGenerate.on("text", ctx => {
    if (ctx.update.message) {
        TutupODPProperties.id_generate = ctx.update.message.text;
    }
    ctx.scene.enter("TutupODPNamaOdp");
});
exports.TutupODPNamaOdp.enter(ctx => {
    ctx.reply("masukan nama ODP");
});
exports.TutupODPNamaOdp.on("text", ctx => {
    if (ctx.update.message) {
        TutupODPProperties.nama_odp = ctx.update.message.text;
    }
    ctx.scene.enter("TutupODPAlamatOdp");
});
exports.TutupODPAlamatOdp.enter(ctx => {
    ctx.reply("masukan alamat ODP");
});
exports.TutupODPAlamatOdp.on("text", ctx => {
    if (ctx.update.message) {
        TutupODPProperties.alamat_odp = ctx.update.message.text;
    }
    ctx.reply("sumary\n" +
        "Id generate : " + TutupODPProperties.id_generate + "\n" +
        "Nama ODP : " + TutupODPProperties.nama_odp + "\n" +
        "Alamat ODP : " + TutupODPProperties.alamat_odp + "\n" +
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
exports.TutupODPAlamatOdp.on("callback_query", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    let id = "";
    if (ctx.callbackQuery.from) {
        id = ctx.callbackQuery.from.id.toString();
    }
    switch (ctx.callbackQuery.data) {
        case "submit":
            yield saveData(id, TutupODPProperties);
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
