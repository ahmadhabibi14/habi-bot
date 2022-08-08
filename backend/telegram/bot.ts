import {Telegraf,Context} from "telegraf"
import {botToken} from "../config"
const bot = new Telegraf(botToken)

bot.start((ctx: Context) => {
  ctx.reply("Silahkan Pilih")
})

export default bot
