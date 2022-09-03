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
exports.broadcast = void 0;
const telegraf_1 = require("telegraf");
const config_1 = require("../config");
const Service_1 = require("../src/teknisi/Service");
const TiketRegular_1 = require("./src/TiketRegular");
const LaporLangsung_1 = require("./src/LaporLangsung");
const TutupOdp_1 = require("./src/TutupOdp");
const TiketSQM_1 = require("./src/TiketSQM");
const Proman_1 = require("./src/Proman");
const Unspect_1 = require("./src/Unspect");
const Valins_1 = require("./src/Valins");
const events_1 = require("events");
const Service_2 = require("../src/teknisi/Service");
//Standard Declration
const bot = new telegraf_1.Telegraf(config_1.botToken);
exports.broadcast = new events_1.EventEmitter();
let sessionID = 0;
//Control Flow
const Start = new telegraf_1.Scenes.BaseScene("Start");
const Close = new telegraf_1.Scenes.BaseScene("Close");
const stage = new telegraf_1.Scenes.Stage([
    //1
    TiketRegular_1.TiketRegularInsiden,
    TiketRegular_1.TiketRegularSpeedy,
    TiketRegular_1.TiketRegularNamaPelanggan,
    TiketRegular_1.TiketRegularPerbaikan,
    //2
    LaporLangsung_1.LaporLangsungIdGenerate,
    LaporLangsung_1.LaporLangsungSpeedy,
    LaporLangsung_1.LaporLangsungNamaPelanggan,
    LaporLangsung_1.LaporLangsungCpPelanggan,
    LaporLangsung_1.LaporLangsungPerbaikan,
    //3
    TutupOdp_1.TutupODPIdGenerate,
    TutupOdp_1.TutupODPNamaOdp,
    TutupOdp_1.TutupODPAlamatOdp,
    //4
    TiketSQM_1.TiketSQMNoInsiden,
    TiketSQM_1.TiketSQMNoSpeedy,
    TiketSQM_1.TiketSQMNamaPelanggan,
    TiketSQM_1.TiketSQMPerbaikan,
    //5
    Proman_1.PromanIdGenerate,
    Proman_1.PromanNamaODP,
    Proman_1.PromanDistribusi,
    Proman_1.PromanKapasitasPort,
    Proman_1.PromanStatusPortIsi,
    Proman_1.PromanStatusPortKosong,
    Proman_1.PromanOdpGendong,
    Proman_1.PromanHasilUkurOpm,
    //6
    Unspect_1.UnspectIdGenerate,
    Unspect_1.UnspectNoSpeedy,
    Unspect_1.UnspectODP,
    Unspect_1.UnspectPerbaikan,
    //7
    Valins_1.ValinsIdValins,
    Valins_1.ValinsNamaOdp,
    //8
    Start,
    Close
], {
    ttl: 10
});
bot.use((0, telegraf_1.session)());
bot.use(stage.middleware());
bot.command("id", ctx => {
    if (ctx.update.message.from) {
        let msg = ctx.update.message.from.id.toString();
        ctx.reply(`id kamu ${msg}, minta leader mendaftarkan-nya`);
    }
});
bot.command("task", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    let teknisiTasks;
    if (!sessionID && ctx.update.message && ctx.update.message.from) {
        sessionID = ctx.update.message.from.id;
    }
    if (ctx.update && ctx.update.message && sessionID != ctx.update.message.from.id) {
        ctx.reply("teknisi lain sedang menggunakan layanan");
        ctx.reply("silahkan tunggu...");
        let watch = setInterval(() => {
            if (sessionID == 0) {
                ctx.reply("teknisi sudah selesai menggunakan, dan kini bot siap di gunakan olehmu");
                clearInterval(watch);
            }
        }, 100);
    }
    else {
        // Teknisi
        if (ctx.update.message.from) {
            let teknisi = yield (0, Service_2.getTeknisi)(0, ctx.update.message.from.id.toString());
            if (!teknisi) {
                ctx.reply("kamu bukan teknisi");
                return;
            }
            teknisiTasks = teknisi.Handle;
            let i = 0;
            let rep = "";
            for (let task of teknisiTasks) {
                i++;
                //if(task instanceof TiketRegular && task.type === "tiketRegular"){
                let done = "sudah";
                if (!task.done) {
                    done = "belum";
                }
                rep = rep +
                    "Jenis : " + task.type + "\n" +
                    "Id : " + i.toString() + "\n" +
                    "Selesai : " + done + "" + "\n\n";
            }
            ctx.reply(rep);
            i = 0;
        }
    }
}));
bot.command("selesai", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    if (ctx.update.message.from) {
        let teknisi = yield (0, Service_2.getTeknisi)(0, ctx.update.message.from.id.toString());
        let id = ctx.update.message.text;
        id = id.split("/selesai ")[1];
        if (!teknisi) {
            ctx.reply("kamu bukan teknisi");
            return;
        }
        try {
            console.log(id);
            teknisi.Handle[Number(id) - 1].done = true;
            yield (0, Service_1.updateUser)(teknisi, sessionID.toString());
            ctx.reply("task " + id + " sudah di selesaikan");
        }
        catch (_a) {
            ctx.reply("task id salah");
        }
    }
}));
bot.command("start", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    //SESSION ID
    if (!sessionID && ctx.update.message && ctx.update.message.from) {
        sessionID = ctx.update.message.from.id;
    }
    if (ctx.update && ctx.update.message && sessionID != ctx.update.message.from.id) {
        ctx.reply("teknisi lain sedang menggunakan layanan");
        ctx.reply("silahkan tunggu...");
        let watch = setInterval(() => {
            if (sessionID == 0) {
                ctx.reply("teknisi sudah selesai menggunakan, dan kini bot siap di gunakan olehmu");
                clearInterval(watch);
            }
        }, 100);
    }
    else {
        // Teknisi
        if (ctx.update.message.from) {
            let teknisi = yield (0, Service_2.getTeknisi)(0, ctx.update.message.from.id.toString());
            if (!teknisi) {
                ctx.reply("kamu bukan teknisi");
                return;
            }
        }
        ctx.scene.enter("Start");
    }
}));
Start.enter(ctx => {
    ctx.reply("Silahkan Pilih", {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: "Tiket Regular", callback_data: "tiket_regular" },
                    { text: "Lapor Langsung", callback_data: "lapor_langsung" }
                ], [
                    { text: "Tutup ODP", callback_data: "tutup_odp" },
                    { text: "Tiket SQM", callback_data: "tiket_sqm" }
                ], [
                    { text: "Proman", callback_data: "proman" },
                    { text: "Unspect", callback_data: "unspect" }
                ], [
                    { text: "Valins", callback_data: "valins" },
                ]
            ]
        }
    });
});
Start.on("callback_query", (ctx) => {
    if (ctx.callbackQuery) {
        switch (ctx.callbackQuery.data) {
            case "tiket_regular":
                ctx.scene.enter("TiketRegularInsiden");
                break;
            case "lapor_langsung":
                ctx.scene.enter("LaporLangsungIdGenerate");
                break;
            case "tutup_odp":
                ctx.scene.enter("TutupODPIdGenerate");
                break;
            case "tiket_sqm":
                ctx.scene.enter("TiketSQMNoInsiden");
                break;
            case "proman":
                ctx.scene.enter("PromanIdGenerate");
                break;
            case "unspect":
                ctx.scene.enter("UnspectIdGenerate");
                break;
            case "valins":
                ctx.scene.enter("ValinsIdValins");
                break;
            default:
                break;
        }
    }
});
Close.enter(ctx => {
    sessionID = 0;
    ctx.scene.leave();
});
exports.broadcast.on("send", (id, message) => {
    //console.log(id)
    bot.telegram.sendMessage(id, message).catch((e) => {
        console.log("couldn't send message to id { " + id + " }");
    });
});
exports.default = bot;
