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
exports.TiketRegularPerbaikan = exports.TiketRegularNamaPelanggan = exports.TiketRegularSpeedy = exports.TiketRegularInsiden = void 0;
const telegraf_1 = require("telegraf");
const Service_1 = require("../../src/teknisi/Service");
//import {upSektor,upWitel,upReg} from "../../src/filtered/Service"
exports.TiketRegularInsiden = new telegraf_1.Scenes.BaseScene("TiketRegularInsiden");
exports.TiketRegularSpeedy = new telegraf_1.Scenes.BaseScene("TiketRegularSpeedy");
exports.TiketRegularNamaPelanggan = new telegraf_1.Scenes.BaseScene("TiketRegularNamaPelanggan");
exports.TiketRegularPerbaikan = new telegraf_1.Scenes.BaseScene("TiketRegularPerbaikan");
class Temp {
    constructor() {
        this.tmp = [];
    }
    set(data, varName) {
        let value = this.get(varName);
        if (!value) {
            this.tmp.push({ name: varName, data });
        }
        else {
            for (let ident of this.tmp) {
                if (ident.name == varName) {
                    ident.data = data;
                    break;
                }
            }
        }
    }
    get(varName) {
        let tmpData = this.tmp.find(e => e.name == varName);
        if (!tmpData) {
            return undefined;
        }
        return tmpData.data;
    }
    clear(varName) {
        this.tmp = this.tmp.filter((e) => e.name != varName);
    }
}
const TiketRegularTmp = new Temp();
exports.TiketRegularInsiden.enter(ctx => {
    let id = "";
    if (ctx.callbackQuery && ctx.callbackQuery.from) {
        id = ctx.callbackQuery.from.id.toString();
    }
    const TiketRegularProperties = {
        type: "tiketRegular",
        no_insiden: "",
        no_speedy: "",
        nama_pelanggan: "",
        perbaikan: "",
        done: false,
        date: new Date(),
        point: 1
    };
    TiketRegularTmp.set(TiketRegularProperties, id);
    ctx.reply("kamu memilih Tiket Regular");
    ctx.reply("masukan nomor insiden (INxxx90)");
});
exports.TiketRegularInsiden.on("text", ctx => {
    let id = "";
    if (ctx.update.message.from) {
        id = ctx.update.message.from.id.toString();
    }
    let TiketRegularProperties = TiketRegularTmp.get(id);
    if (TiketRegularProperties == undefined) {
        ctx.reply("terjadi masalah tak terduga");
        return;
    }
    if (ctx.update.message) {
        TiketRegularProperties.no_insiden = ctx.update.message.text;
        TiketRegularTmp.set(TiketRegularProperties, id);
    }
    ctx.scene.enter("TiketRegularSpeedy");
});
exports.TiketRegularSpeedy.enter(ctx => {
    ctx.reply("masukan nomor speedy");
});
exports.TiketRegularSpeedy.on("text", ctx => {
    let id = "";
    if (ctx.update.message.from) {
        id = ctx.update.message.from.id.toString();
    }
    let TiketRegularProperties = TiketRegularTmp.get(id);
    if (TiketRegularProperties == undefined) {
        return;
    }
    if (ctx.update.message) {
        TiketRegularProperties.no_speedy = ctx.update.message.text;
        TiketRegularTmp.set(TiketRegularProperties, id);
    }
    ctx.scene.enter("TiketRegularNamaPelanggan");
});
exports.TiketRegularNamaPelanggan.enter(ctx => {
    ctx.reply("masukan nama pelanggan");
});
exports.TiketRegularNamaPelanggan.on("text", ctx => {
    let id = "";
    if (ctx.update.message.from) {
        id = ctx.update.message.from.id.toString();
    }
    let TiketRegularProperties = TiketRegularTmp.get(id);
    if (TiketRegularProperties == undefined) {
        return;
    }
    if (ctx.update.message) {
        TiketRegularProperties.nama_pelanggan = ctx.update.message.text;
        TiketRegularTmp.set(TiketRegularProperties, id);
    }
    ctx.scene.enter("TiketRegularPerbaikan");
});
exports.TiketRegularPerbaikan.enter(ctx => {
    ctx.reply("masukan cara perbaikan");
});
exports.TiketRegularPerbaikan.on("text", ctx => {
    let id = "";
    if (ctx.update.message.from) {
        id = ctx.update.message.from.id.toString();
    }
    let TiketRegularProperties = TiketRegularTmp.get(id);
    if (TiketRegularProperties == undefined) {
        return;
    }
    if (ctx.update.message) {
        TiketRegularProperties.perbaikan = ctx.update.message.text;
        TiketRegularTmp.set(TiketRegularProperties, id);
    }
    if (TiketRegularProperties != undefined) {
        ctx.reply("sumary\n" +
            "No IN : " + TiketRegularProperties.no_insiden + "\n" +
            "No speedy : " + TiketRegularProperties.no_speedy + "\n" +
            "Nama pelanggan : " + TiketRegularProperties.nama_pelanggan + "\n" +
            "Perbaikan : " + TiketRegularProperties.perbaikan + "\n" +
            "Jika sudah benar tekan submit.", {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: "submit", callback_data: "submit" }, { text: "cancel", callback_data: "cancel" }
                    ]
                ]
            }
        });
    }
});
exports.TiketRegularPerbaikan.on("callback_query", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    let id = "";
    if (ctx.callbackQuery.from) {
        id = ctx.callbackQuery.from.id.toString();
    }
    if (ctx.callbackQuery) {
        switch (ctx.callbackQuery.data) {
            case "submit":
                let data = TiketRegularTmp.get(id);
                if (data != undefined) {
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
                                task.date.getTime() - Date.now() < sd
                            //task.done == false
                            ) {
                                //console.log("sama")
                                teknisi.point -= 2;
                                let nub = {
                                    point: 0,
                                    date: new Date(),
                                    done: false,
                                    type: "nub"
                                };
                                teknisi.Handle.push(nub);
                                yield (0, Service_1.updateUser)(teknisi, id);
                                same = true;
                                ctx.reply("saving data...");
                                ctx.scene.enter("Close");
                                // await upSektor(teknisi.Sektor,teknisi.point,"-")
                                // await upWitel(teknisi.Witel,teknisi.point,"-")
                                // await upReg(teknisi.Regional,teknisi.point,"-")
                                break;
                            }
                        }
                    }
                    yield saveData(id, data);
                    yield ctx.reply("saving data...");
                    ctx.scene.enter("Close");
                }
                break;
            case "cancel":
                ctx.reply("membatalkan...");
                ctx.scene.enter("Close");
                TiketRegularTmp.clear(id);
                break;
            default:
                console.log("");
                break;
        }
    }
}));
function saveData(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, Service_1.updateHandle)(data, id);
    });
}
