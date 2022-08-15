import {Scenes} from  "telegraf"
import {Valins} from "../../src/performansi/Model"
import {updateHandle} from "../../src/teknisi/Service"

export const ValinsIdValins =  new Scenes.BaseScene<Scenes.SceneContext>("ValinsIdValins")
export const ValinsNamaOdp =  new Scenes.BaseScene<Scenes.SceneContext>("ValinsNamaOdp")

async function saveData(id: string,data: Valins){
  await updateHandle(data,id)
}

const ValinsProperties = {
  type: "Valins",
  id_valins : "",
  nama_odp : "",
  date : new Date(),
  done : false,
  point : 1
}

ValinsIdValins.enter(ctx => {
  ctx.reply("kamu memilih valins")
  ctx.reply("masukan id valins")
})
ValinsIdValins.on('text',ctx =>{
  if(ctx.update.message){
    ValinsProperties.id_valins = ctx.update.message.text
  }
  ctx.scene.enter("ValinsNamaOdp")
})

ValinsNamaOdp.enter(ctx => {
  ctx.reply("masukan nama odp")
})
ValinsNamaOdp.on('text',ctx =>{
  if(ctx.update.message){
    ValinsProperties.nama_odp = ctx.update.message.text
  }
  ctx.reply(
    "sumary\n"+
      "Id valins :" +ValinsProperties.id_valins +"\n"+
      "nama odp  :" + ValinsProperties.nama_odp +"\n"+
      "Jika sudah benar tekan Submit",{
        reply_markup : {
          inline_keyboard : [
            [
              { text : "submit",callback_data: "submit"},{ text: "cancel",callback_data:"cancel"}
            ]
          ]
        }
      }
  )
})

ValinsNamaOdp.on("callback_query",async ctx => {
  let id: string = ""
  if(ctx.callbackQuery.from){
    id = ctx.callbackQuery.from.id.toString()
  }
  switch(ctx.callbackQuery.data){
      case "submit": 
        await saveData(id,ValinsProperties)
        await ctx.reply("saving data...")
        ctx.scene.enter("Close")
        break
      case "cancel":
        ctx.reply("membatalkan...")
        ctx.scene.enter("Close")
        break
      default : 
        console.log("")
        break
    }
})
