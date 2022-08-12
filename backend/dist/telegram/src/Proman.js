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
exports.PromanHasilUkurOpm = exports.PromanOdpGendong = exports.PromanStatusPortKosong = exports.PromanStatusPortIsi = exports.PromanKapasitasPort = exports.PromanDistribusi = exports.PromanNamaODP = exports.PromanIdGenerate = void 0;
const telegraf_1 = require("telegraf");
const Service_1 = require("../../src/teknisi/Service");
exports.PromanIdGenerate = new telegraf_1.Scenes.BaseScene("PromanIdGenerate");
exports.PromanNamaODP = new telegraf_1.Scenes.BaseScene("PromanNamaODP");
exports.PromanDistribusi = new telegraf_1.Scenes.BaseScene("PromanDistribusi");
exports.PromanKapasitasPort = new telegraf_1.Scenes.BaseScene("PromanKapasitasPort");
exports.PromanStatusPortIsi = new telegraf_1.Scenes.BaseScene("PromanStatusPortIsi");
exports.PromanStatusPortKosong = new telegraf_1.Scenes.BaseScene("PromanStatusPortKosong");
exports.PromanOdpGendong = new telegraf_1.Scenes.BaseScene("PromanOdpGendong");
exports.PromanHasilUkurOpm = new telegraf_1.Scenes.BaseScene("PromanHasilUkurOpm");
function saveData(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, Service_1.updateHandle)(data, id);
    });
}
const PromanProperties = {
    type: "Proman",
    id_generate: "",
    nama_odp: "",
    distribusi: "",
    kapasitas_port: "",
    status_port_isi: "",
    status_port_kosong: "",
    odp_gendong: "",
    hasil_ukur_opm: "",
    point: 1
};
exports.PromanIdGenerate.enter(ctx => {
    ctx.reply("kamu memilih Proman");
    ctx.reply("masukan id generate");
});
exports.PromanIdGenerate.on("text", ctx => {
    if (ctx.update.message) {
        PromanProperties.id_generate = ctx.update.message.text;
    }
    ctx.scene.enter("PromanNamaODP");
});
exports.PromanNamaODP.enter(ctx => {
    ctx.reply("masukan nama ODP ");
});
exports.PromanNamaODP.on("text", (ctx) => {
    if (ctx.update.message) {
        PromanProperties.nama_odp = ctx.update.message.text;
    }
    ctx.scene.enter("PromanDistribusi");
});
exports.PromanDistribusi.enter(cx => {
    cx.reply("masukan distribusi");
});
exports.PromanDistribusi.on("text", ctx => {
    if (ctx.update.message) {
        PromanProperties.distribusi = ctx.update.message.text;
    }
    ctx.scene.enter("PromanKapasitasPort");
});
exports.PromanKapasitasPort.enter(ctx => {
    ctx.reply("masukan kapasitas port");
});
exports.PromanKapasitasPort.on("text", (ctx) => {
    if (ctx.update.message) {
        PromanProperties.kapasitas_port = ctx.update.message.text;
    }
    ctx.scene.enter("PromanStatusPortIsi");
});
exports.PromanStatusPortIsi.enter(ctx => {
    ctx.reply("masukan status port isi");
});
exports.PromanStatusPortIsi.on("text", ctx => {
    if (ctx.update.message) {
        PromanProperties.status_port_isi = ctx.update.message.text;
    }
    ctx.scene.enter("PromanStatusPortKosong");
});
exports.PromanStatusPortKosong.enter(ctx => {
    ctx.reply("masukan status port isi");
});
exports.PromanStatusPortKosong.on("text", ctx => {
    if (ctx.update.message) {
        PromanProperties.status_port_kosong = ctx.update.message.text;
    }
    ctx.scene.enter("PromanOdpGendong");
});
exports.PromanOdpGendong.enter(ctx => {
    ctx.reply("masukan status port isi");
});
exports.PromanOdpGendong.on("text", ctx => {
    if (ctx.update.message) {
        PromanProperties.odp_gendong = ctx.update.message.text;
    }
    ctx.scene.enter("PromanHasilUkurOpm");
});
exports.PromanHasilUkurOpm.enter(ctx => {
    ctx.reply("masukan status port isi");
});
exports.PromanHasilUkurOpm.on("text", ctx => {
    if (ctx.update.message) {
        PromanProperties.hasil_ukur_opm = ctx.update.message.text;
    }
    ctx.reply("summary\n" +
        "Id generate :" + PromanProperties.id_generate + "\n" +
        "Distribusi :" + PromanProperties.distribusi + "\n" +
        "Kapasitas port :" + PromanProperties.kapasitas_port + "\n" +
        "Status port isi :" + PromanProperties.status_port_isi + "\n" +
        "Status port kosong :" + PromanProperties.status_port_kosong + "\n" +
        "Odp gendong :" + PromanProperties.odp_gendong + "\n" +
        "Hasil ukur opm :" + PromanProperties.hasil_ukur_opm + "\n" +
        "Jika sudah benar klik submit", {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: "submit", callback_data: "submit" }, { text: "cancel", callback_data: "cancel" }
                ]
            ]
        }
    });
});
exports.PromanHasilUkurOpm.on("callback_query", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    let id = "";
    if (ctx.callbackQuery.from) {
        id = ctx.callbackQuery.from.id.toString();
    }
    switch (ctx.callbackQuery.data) {
        case "submit":
            yield saveData(id, PromanProperties);
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
