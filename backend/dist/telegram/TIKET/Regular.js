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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tiketRegular = exports.textRegular = void 0;
const events_1 = __importDefault(require("events"));
const record_1 = require("./record");
let text = new events_1.default.EventEmitter();
let done = new events_1.default.EventEmitter();
let ctx;
let bot;
let i = 0;
let regularObj = {
    nama: "",
    insiden: "",
    speedy: "",
    nama_pelanggan: "",
    repair: ""
};
let value = [];
let textRegular = (ex) => {
    i++;
    text.emit("value", { ex, i });
};
exports.textRegular = textRegular;
text.on("value", el => {
    let e = {
        ex: el.ex,
        i: el.i,
    };
    value.push(e);
    console.log(value);
    setIn(i);
});
function setIn(is) {
    is -= 1;
    const replies = [
        "masukan no speedy",
        "masukan nama pelanggan",
        "perbaikan"
    ];
    if (i >= 4) {
        regularObj.nama = "regular";
        regularObj.insiden = value[0].ex;
        regularObj.nama_pelanggan = value[2].ex;
        regularObj.speedy = value[1].ex;
        regularObj.repair = value[3].ex;
        (0, record_1.SubmitData)(regularObj);
        ctx.reply("No Insiden : " + regularObj.insiden + "\n" +
            "Nama Pelangan :" + regularObj.nama_pelanggan + "\n" +
            "No Speedy :" + regularObj.speedy + "\n" +
            "Perbaikan :" + regularObj.repair + "\n", {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: "submit", callback_data: "record_submit" },
                        { text: "cancel", callback_data: "record_discard" }
                    ]
                ]
            }
        });
        i = 0;
        regularObj = {
            nama: '',
            insiden: "",
            speedy: "",
            nama_pelanggan: "",
            repair: "",
        };
        value = [];
        return;
    }
    if (ctx.callbackQuery && ctx.callbackQuery.message && ctx.callbackQuery.message.chat) {
        bot.telegram.sendMessage(ctx.callbackQuery.message.chat.id, replies[is]);
    }
}
function tiketRegular(ct, bo) {
    return __awaiter(this, void 0, void 0, function* () {
        ctx = ct;
        bot = bo;
        if (ct.callbackQuery && ct.callbackQuery.message) {
            ct.reply("anda memilih tiket regular", {
                reply_to_message_id: ct.callbackQuery.message.message_id
            });
        }
        ct.reply("silahkan masukan insiden (exp: INxxx90)");
    });
}
exports.tiketRegular = tiketRegular;
