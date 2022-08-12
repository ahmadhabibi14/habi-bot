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
exports.tiketRegular = exports.regularScene = exports.textRegular = void 0;
const telegraf_1 = require("telegraf");
const events_1 = __importDefault(require("events"));
const record_1 = require("./record");
let text = new events_1.default.EventEmitter();
let done = new events_1.default.EventEmitter();
let i = 0;
let textRegular = (ex) => {
    i++;
    text.emit("value", { ex, i });
};
exports.textRegular = textRegular;
exports.regularScene = new telegraf_1.Scenes.BaseScene('regular');
function tiketRegular(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        let regularObj = {
            insiden: "",
            speedy: "",
            cp_pelanggan: "",
            cause: "",
            solved: ""
        };
        let value = [];
        text.on("value", e => {
            value.push(e);
            setIn(i);
        });
        ctx.reply("anda memilih tiket regular");
        ctx.reply("silahkan masukan IN (exp: INxxx90)");
        regularObj.insiden = "";
        function setIn(i) {
            i -= 1;
            const replies = [
                "masukan no speedy",
                "masukan cp pelangang",
                "masukan masalah",
                "masuakn cara menyelasaikan masalah"
            ];
            if (i >= 4) {
                regularObj.insiden = value[0].ex;
                regularObj.cp_pelanggan = value[1].ex;
                regularObj.speedy = value[2].ex;
                regularObj.cause = value[3].ex;
                regularObj.solved = value[4].ex;
                (0, record_1.SubmitData)(regularObj);
                ctx.reply("No Insiden : " + regularObj.insiden + "\n" +
                    "Cp Pelangan :" + regularObj.cp_pelanggan + "\n" +
                    "No Speedy :" + regularObj.speedy + "\n" +
                    "Masalah :" + regularObj.cause + "\n" +
                    "Solusi :" + regularObj.solved, {
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
                    insiden: "",
                    speedy: "",
                    cp_pelanggan: "",
                    cause: "",
                    solved: ""
                };
                return;
            }
            ctx.reply(replies[i]);
        }
        //Stage.enter('regular')
        //ctx.reply(`2${ctx.update.callback_query.data}`)
    });
}
exports.tiketRegular = tiketRegular;
