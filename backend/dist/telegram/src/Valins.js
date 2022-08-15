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
exports.ValinsNamaOdp = exports.ValinsIdValins = void 0;
const telegraf_1 = require("telegraf");
const Service_1 = require("../../src/teknisi/Service");
exports.ValinsIdValins = new telegraf_1.Scenes.BaseScene("ValinsIdValins");
exports.ValinsNamaOdp = new telegraf_1.Scenes.BaseScene("ValinsNamaOdp");
function saveData(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, Service_1.updateHandle)(data, id);
    });
}
const ValinsProperties = {
    type: "Valins",
    id_valins: "",
    nama_odp: "",
    date: new Date(),
    done: false,
    point: 1
};
exports.ValinsIdValins.enter(ctx => {
    ctx.reply("kamu memilih valins");
    ctx.reply("masukan id valins");
});
exports.ValinsIdValins.on('text', ctx => {
    if (ctx.update.message) {
        ValinsProperties.id_valins = ctx.update.message.text;
    }
    ctx.scene.enter("ValinsNamaOdp");
});
exports.ValinsNamaOdp.enter(ctx => {
    ctx.reply("masukan nama odp");
});
exports.ValinsNamaOdp.on('text', ctx => {
    if (ctx.update.message) {
        ValinsProperties.nama_odp = ctx.update.message.text;
    }
    ctx.reply("sumary\n" +
        "Id valins :" + ValinsProperties.id_valins + "\n" +
        "nama odp  :" + ValinsProperties.nama_odp + "\n" +
        "Jika sudah benar tekan Submit", {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: "submit", callback_data: "submit" }, { text: "cancel", callback_data: "cancel" }
                ]
            ]
        }
    });
});
exports.ValinsNamaOdp.on("callback_query", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    let id = "";
    if (ctx.callbackQuery.from) {
        id = ctx.callbackQuery.from.id.toString();
    }
    switch (ctx.callbackQuery.data) {
        case "submit":
            yield saveData(id, ValinsProperties);
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
