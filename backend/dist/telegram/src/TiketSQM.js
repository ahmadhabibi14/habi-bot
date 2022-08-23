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
exports.TiketSQMPerbaikan = exports.TiketSQMNamaPelanggan = exports.TiketSQMNoSpeedy = exports.TiketSQMNoInsiden = void 0;
const telegraf_1 = require("telegraf");
const Service_1 = require("../../src/teknisi/Service");
const Service_2 = require("../../src/filtered/Service");
exports.TiketSQMNoInsiden = new telegraf_1.Scenes.BaseScene("TiketSQMNoInsiden");
exports.TiketSQMNoSpeedy = new telegraf_1.Scenes.BaseScene("TiketSQMNoSpeedy");
exports.TiketSQMNamaPelanggan = new telegraf_1.Scenes.BaseScene("TiketSQMNamaPelanggan");
exports.TiketSQMPerbaikan = new telegraf_1.Scenes.BaseScene("TiketSQMPerbaikan");
function saveData(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, Service_1.updateHandle)(data, id);
    });
}
const TiketSQMProperties = {
    type: "TiketSQM",
    no_insiden: "",
    no_speedy: "",
    nama_pelanggan: "",
    perbaikan: "",
    done: false,
    date: new Date(),
    point: 0.5
};
exports.TiketSQMNoInsiden.enter(ctx => {
    ctx.reply("Kamu memilih tiket sqm");
    ctx.reply("Silahkan masuakan nomor insiden ");
});
exports.TiketSQMNoInsiden.on("text", ctx => {
    if (ctx.update.message) {
        TiketSQMProperties.no_insiden = ctx.update.message.text;
    }
    ctx.scene.enter("TiketSQMNoSpeedy");
});
exports.TiketSQMNoSpeedy.enter(ctx => {
    ctx.reply("masukan nomor seedy");
});
exports.TiketSQMNoSpeedy.on("text", ctx => {
    if (ctx.update.message) {
        TiketSQMProperties.no_speedy = ctx.update.message.text;
    }
    ctx.scene.enter("TiketSQMNamaPelanggan");
});
exports.TiketSQMNamaPelanggan.enter(ctx => {
    ctx.reply("masukan nama pelanggan");
});
exports.TiketSQMNamaPelanggan.on("text", ctx => {
    if (ctx.update.message) {
        TiketSQMProperties.nama_pelanggan = ctx.update.message.text;
    }
    ctx.scene.enter("TiketSQMPerbaikan");
});
exports.TiketSQMPerbaikan.enter(ctx => {
    ctx.reply("masukan cara perbaikan");
});
exports.TiketSQMPerbaikan.on("text", (ctx) => {
    if (ctx.update.message) {
        TiketSQMProperties.perbaikan = ctx.update.message.text;
    }
    ctx.reply("sumary\n" +
        "NO insiden : " + TiketSQMProperties.no_insiden + "\n" +
        "NO Speedy  : " + TiketSQMProperties.no_speedy + "\n" +
        "Nama pelanggan : " + TiketSQMProperties.nama_pelanggan + "\n" +
        "Perbaikan : " + TiketSQMProperties.perbaikan + "\n" +
        "Jika sudah sesuai tekan submit", {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: "submit", callback_data: "submit" }, { text: "cancel", callback_data: "cancel" }
                ]
            ]
        }
    });
});
exports.TiketSQMPerbaikan.on("callback_query", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    let id = "";
    if (ctx.callbackQuery.from) {
        id = ctx.callbackQuery.from.id.toString();
    }
    switch (ctx.callbackQuery.data) {
        case "submit":
            let data = TiketSQMProperties;
            let ids = data.no_speedy;
            let same = false;
            let teknisies = yield (0, Service_1.getAll)();
            for (let i = 0; i < teknisies.length - 1; i++) {
                let teknisi = teknisies[i];
                delete teknisi._id;
                for (let task of teknisi.Handle) {
                    let sd = 1000 * 60 * 60 * 24 * 60;
                    if (task.type != "tiketRegular") {
                        continue;
                    }
                    if (task.no_speedy == data.no_speedy &&
                        task.date.getTime() - Date.now() < sd &&
                        task.done == false) {
                        //console.log("sama")
                        teknisi.point -= 2;
                        let nub = {
                            type: 'nub',
                            done: false,
                            date: new Date()
                        };
                        teknisi.Handle.push(Nub);
                        yield (0, Service_1.updateUser)(teknisi, id);
                        same = true;
                        ctx.reply("saving data...");
                        ctx.scene.enter("Close");
                        yield (0, Service_2.upSektor)(teknisi.Sektor, teknisi.point, "-");
                        yield (0, Service_2.upWitel)(teknisi.Witel, teknisi.point, "-");
                        yield (0, Service_2.upReg)(teknisi.Regional, teknisi.point, "-");
                        break;
                    }
                }
            }
            yield saveData(id, TiketSQMProperties);
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
