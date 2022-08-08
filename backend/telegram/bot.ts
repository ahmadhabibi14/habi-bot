import {Telegraf,Context} from "telegraf"
import {botToken} from "../config"
const bot = new Telegraf(botToken)

bot.start((ctx: Context) => {
  // FIRST REPLY
  ctx.reply("Silahkan Pilih", {
    reply_markup : {
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
          },{
            text: "Proman",
            callback_data: "proman"
          }
        ],
        [
          {
            text: "Tiket SQM",
            callback_data: "tiket_sqm"
          },{
            text: "Valins",
            callback_data: "valins"
          }
        ],[
          {
            text: "Unspect",
            callback_data: "unspect"
          }
        ]
      ]
    }
  })
  // END REPLY
})

export default bot
