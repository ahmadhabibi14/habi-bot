import {Context,Scenes} from "telegraf"
import event from "events"
import {SubmitData} from "./record"

type Re = {ex: string,i: number} 

let text = new event.EventEmitter()
let done = new event.EventEmitter()
let ctx: Context 
let bot: any
let i = 0
let regularObj = {
    insiden: "",
    speedy : "",
    nama_pelanggan: "",
    repair : ""
}
let value: Re[] = []

export let textRegular = (ex: string) => {
  i++
  text.emit("value",{ex,i})
}
text.on("value",el => {
    let e = {
      ex : el.ex,
      i  : el.i,
    }
    value.push(e)
    console.log(value)
    setIn(i)
})

function setIn(is: number){
    is -= 1
    const replies = [
       "masukan no speedy",
       "masukan nama pelanggan",
       "perbaikan"
     ]
    if(i >= 4){
      regularObj.insiden = value[0].ex
      regularObj.nama_pelanggan = value[2].ex
      regularObj.speedy = value[1].ex
      regularObj.repair = value[3].ex
      SubmitData(regularObj)
      ctx.reply(
        "No Insiden : "+regularObj.insiden+"\n" +
        "Nama Pelangan :"+regularObj.nama_pelanggan +"\n"+
        "No Speedy :"+regularObj.speedy +"\n"+
        "Perbaikan :"+regularObj.repair +"\n",{
          reply_markup : {
            inline_keyboard : [
              [
                {text: "submit",callback_data : "record_submit"},
                {text: "cancel",callback_data : "record_discard"}
              ]
            ]
          }
        }
      )
      i = 0
      regularObj = {
        insiden: "",
        speedy : "",
        nama_pelanggan: "",
        repair : "",
      }
      value = []
      return
    }
    if(ctx.callbackQuery && ctx.callbackQuery.message && ctx.callbackQuery.message.chat){
      bot.telegram.sendMessage(ctx.callbackQuery.message.chat.id,replies[is])
    }
}

export async function tiketRegular(ct: Context,bo: any){
  ctx = ct
  bot = bo
  if(ct.callbackQuery && ct.callbackQuery.message){
    ct.reply("anda memilih tiket regular",{
      reply_to_message_id : ct.callbackQuery.message.message_id
    })
  }
  ct.reply("silahkan masukan IN (exp: INxxx90)")
}
