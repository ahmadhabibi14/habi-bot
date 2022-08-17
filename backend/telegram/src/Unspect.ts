import {Scenes} from  "telegraf"
import {Unspect} from "../../src/performansi/Model"
import {updateHandle} from "../../src/teknisi/Service"

export const UnspectIdGenerate = new Scenes.BaseScene<Scenes.SceneContext>("UnspectIdGenerate")
export const UnspectNoSpeedy = new Scenes.BaseScene<Scenes.SceneContext>("UnspectNoSpeedy")
export const UnspectODP = new Scenes.BaseScene<Scenes.SceneContext>("UnspectODP")
export const UnspectPerbaikan =new Scenes.BaseScene<Scenes.SceneContext>("UnspectPerbaikan") 

async function saveData(id: string,data: Unspect){
  await updateHandle(data,id)
}

const UnspectProperties: Unspect = {
  type: "Unspect",
  id_generate : "",
  no_speedy : "",
  odp : "",
  done : false,
  perbaikan : "",
  date : new Date(),
  point : 0.7
}

UnspectIdGenerate.enter(ctx => {
  ctx.reply("kamu memilih Unspect")
  ctx.reply("masukan id generate")
})
UnspectIdGenerate.on("text",ctx =>{
  if(ctx.update.message){
    UnspectProperties.id_generate = ctx.update.message.text
  }
  ctx.scene.enter("UnspectNoSpeedy")
})

UnspectNoSpeedy.enter(ctx => {
  ctx.reply("masukan nomor speedy")
})
UnspectNoSpeedy.on("text",ctx =>{
  if(ctx.update.message){
    UnspectProperties.no_speedy = ctx.update.message.text
  }
  ctx.scene.enter("UnspectODP")
})

UnspectODP.enter(ctx => {
  ctx.reply("masukan ODP")
})
UnspectODP.on("text",ctx =>{
  if(ctx.update.message){
    UnspectProperties.odp = ctx.update.message.text
  }
  ctx.scene.enter("UnspectPerbaikan")
})

UnspectPerbaikan.enter(ctx => {
  ctx.reply("masukan cara perbaikan")
})
UnspectPerbaikan.on("text",ctx =>{
  if(ctx.update.message){
    UnspectProperties.perbaikan = ctx.update.message.text
  }
  ctx.reply(
    "sumary\n"+
      "Id generate : "+UnspectProperties.id_generate+"\n"+
      "No speedy : "+UnspectProperties.no_speedy+"\n"+
      "Odp : "+UnspectProperties.odp+"\n"+
      "Perbaikan : "+UnspectProperties.perbaikan+"\n"+
    "Jika Sudah benar tekan Submit",{
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

UnspectPerbaikan.on("callback_query",async ctx => {
  let id: string = ""
  if(ctx.callbackQuery.from){
    id = ctx.callbackQuery.from.id.toString()
  }
  switch(ctx.callbackQuery.data){
      case "submit": 
        await saveData(id,UnspectProperties)
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
