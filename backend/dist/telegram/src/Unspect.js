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
exports.UnspectPerbaikan = exports.UnspectODP = exports.UnspectNoSpeedy = exports.UnspectIdGenerate = void 0;
const telegraf_1 = require("telegraf");
const Service_1 = require("../../src/teknisi/Service");
exports.UnspectIdGenerate = new telegraf_1.Scenes.BaseScene("UnspectIdGenerate");
exports.UnspectNoSpeedy = new telegraf_1.Scenes.BaseScene("UnspectNoSpeedy");
exports.UnspectODP = new telegraf_1.Scenes.BaseScene("UnspectODP");
exports.UnspectPerbaikan = new telegraf_1.Scenes.BaseScene("UnspectPerbaikan");
function saveData(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, Service_1.updateHandle)(data, id);
    });
}
const UnspectProperties = {
    name: "Unspect",
    id_generate: "",
    no_speedy: "",
    odp: "",
    perbaikan: "",
    point: 1
};
exports.UnspectIdGenerate.enter(ctx => {
    ctx.reply("kamu memilih Unspect");
    ctx.reply("masukan id generate");
});
exports.UnspectIdGenerate.on("text", ctx => {
    if (ctx.update.message) {
        UnspectProperties.id_generate = ctx.update.message.text;
    }
    ctx.scene.enter("UnspectNoSpeedy");
});
exports.UnspectNoSpeedy.enter(ctx => {
    ctx.reply("masukan nomor speedy");
});
exports.UnspectNoSpeedy.on("text", ctx => {
    if (ctx.update.message) {
        UnspectProperties.no_speedy = ctx.update.message.text;
    }
    ctx.scene.enter("UnspectODP");
});
exports.UnspectODP.enter(ctx => {
    ctx.reply("masukan odp");
});
exports.UnspectODP.on("text", ctx => {
    if (ctx.update.message) {
        UnspectProperties.odp = ctx.update.message.text;
    }
    ctx.scene.enter("UnspectPerbaikan");
});
exports.UnspectPerbaikan.enter(ctx => {
    ctx.reply("masukan cara perbaikan");
});
exports.UnspectPerbaikan.on("text", ctx => {
    if (ctx.update.message) {
        UnspectProperties.perbaikan = ctx.update.message.text;
    }
    ctx.reply("sumary\n" +
        "Id generate : " + UnspectProperties.id_generate + "\n" +
        "No speedy : " + UnspectProperties.no_speedy + "\n" +
        "Odp : " + UnspectProperties.odp + "\n" +
        "Perbaikan : " + UnspectProperties.perbaikan + "\n" +
        "Jika Sudah benar tekan Submit", {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: "submit", callback_data: "submit" }, { text: "cancel", callback_data: "cancel" }
                ]
            ]
        }
    });
});
exports.UnspectPerbaikan.on("callback_query", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    let id = "";
    if (ctx.callbackQuery.from) {
        id = ctx.callbackQuery.from.id.toString();
    }
    switch (ctx.callbackQuery.data) {
        case "submit":
            yield saveData(id, UnspectProperties);
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
