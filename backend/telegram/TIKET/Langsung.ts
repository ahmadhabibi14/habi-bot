import {Context,Scenes} from "telegraf"
import event from "events"
import {SubmitData} from "./record"

let text = new event.EventEmitter()
let done = new event.EventEmitter()
let i = 0
export let textRegular = (ex: string) => {
  i++
  text.emit("value",{ex,i})
}

export const regularScene = new Scenes.BaseScene<Scenes.SceneContext>('regular')
export async function tiketRegular(ctx: Context){
  let regularObj = {
    insiden: "",
    speedy : "",
    cp_pelanggan: "",
    cause : "",
    solved : ""
  }
  type Re = {ex: string,i: number}
  let value: Re[] = []

  text.on("value",e => {
    value.push(e)
    setIn(i)
  })

  ctx.reply("anda memilih tiket regular")
  ctx.reply("silahkan masukan IN (exp: INxxx90)")
  regularObj.insiden =  ""
  function setIn(i: number){
    i -= 1
    const replies = [
       "masukan no speedy",
       "masukan cp pelangang",
       "masukan masalah",
       "masuakn cara menyelasaikan masalah"
     ]
    if(i >= 4){
      regularObj.insiden = value[0].ex
      regularObj.cp_pelanggan = value[1].ex
      regularObj.speedy = value[2].ex
      regularObj.cause = value[3].ex
      regularObj.solved = value[4].ex
      SubmitData(regularObj)
      ctx.reply(
        "No Insiden : "+regularObj.insiden+"\n"+
        "Cp Pelangan :"+regularObj.cp_pelanggan+"\n"+
        "No Speedy :"+regularObj.speedy+"\n"+
        "Masalah :"+regularObj.cause+"\n"+
        "Solusi :"+regularObj.solved,{
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
        cp_pelanggan: "",
        cause : "",
        solved : ""
      }
      return
    }
    ctx.reply(replies[i])
  }
  //Stage.enter('regular')
  //ctx.reply(`2${ctx.update.callback_query.data}`)
}
