"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const telegraf_1 = require("telegraf");
const config_1 = require("../config");
const bot = new telegraf_1.Telegraf(config_1.botToken);
bot.start((ctx) => {
    // FIRST REPLY
    ctx.reply("Silahkan Pilih", {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: "Tiket Regular",
                        callback_data: "tiket_regular"
                    }, {
                        text: "Lapor Langsung",
                        callback_data: "lapor_langsung"
                    }
                ],
                [
                    {
                        text: "Tutup ODP",
                        callback_data: "tutup_od p"
                    }, {
                        text: "Proman",
                        callback_data: "proman"
                    }
                ],
                [
                    {
                        text: "Tiket SQM",
                        callback_data: "tiket_sqm"
                    }, {
                        text: "Valins",
                        callback_data: "valins"
                    }
                ], [
                    {
                        text: "Unspect",
                        callback_data: "unspect"
                    }
                ]
            ]
        }
    });
    // END REPLY
});
exports.default = bot;
