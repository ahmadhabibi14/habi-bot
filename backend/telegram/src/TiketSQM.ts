import {Scenes} from  "telegraf"
import {TiketSQM} from "../../src/performansi/Model"
import {updateHandle} from "../../src/teknisi/Service"

export const TiketSQMNoInsiden = new Scenes.BaseScene<Scenes.SceneContext>("TiketSQMNoInsiden")
export const TiketSQMNoSpeedy = new Scenes.BaseScene<Scenes.SceneContext>("TiketSQMNoSpeedy")
export const TiketSQMNamaPelanggan = new Scenes.BaseScene<Scenes.SceneContext>("TiketSQMNamaPelanggan")
export const TiketSQMPerbaikan = new Scenes.BaseScene<Scenes.SceneContext>("TiketSQMPerbaikan")

async function saveData(id: string,data: TiketSQM){
  await updateHandle(data,id)
}

const TiketSQMProperties = {
  type : "TiketSQM",
  no_insiden : "",
  no_speedy : "",
  nama_pelanggan : "",
  perbaikan : "",
  done : false,
  date : new Date(),
  point : 0.1 
}

TiketSQMNoInsiden.enter(ctx => {
  ctx.reply("Kamu memilih tiket sqm")
  ctx.reply("Silahkan masuakan nomor insiden ")
})
TiketSQMNoInsiden.on("text",ctx => {
  if(ctx.update.message){
    TiketSQMProperties.no_insiden = ctx.update.message.text
  }
  ctx.scene.enter("TiketSQMNoSpeedy")
})

TiketSQMNoSpeedy.enter(ctx => {
  ctx.reply("masukan nomor seedy")
})
TiketSQMNoSpeedy.on("text",ctx => {
  if(ctx.update.message){
    TiketSQMProperties.no_speedy = ctx.update.message.text
  }
  ctx.scene.enter("TiketSQMNamaPelanggan")
})

TiketSQMNamaPelanggan.enter(ctx => {
  ctx.reply("masukan nama pelanggan")
})
TiketSQMNamaPelanggan.on("text",ctx => {
  if(ctx.update.message){
    TiketSQMProperties.nama_pelanggan = ctx.update.message.text
  }
  ctx.scene.enter("TiketSQMPerbaikan")
})

TiketSQMPerbaikan.enter(ctx => {
  ctx.reply("masukan cara perbaikan")
})
TiketSQMPerbaikan.on("text",(ctx)=>{
  if(ctx.update.message){
    TiketSQMProperties.perbaikan = ctx.update.message.text
  }
  ctx.reply(
    "sumary\n"+
      "NO insiden : "+TiketSQMProperties.no_insiden+"\n"+
      "NO Speedy  : "+TiketSQMProperties.no_speedy+"\n"+
      "Nama pelanggan : "+TiketSQMProperties.nama_pelanggan+"\n"+
      "Perbaikan : "+TiketSQMProperties.perbaikan+"\n"+
      "Jika sudah sesuai tekan submit", {
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

TiketSQMPerbaikan.on("callback_query",async ctx => {
  let id: string = ""
  if(ctx.callbackQuery.from){
    id = ctx.callbackQuery.from.id.toString()
  }
  switch(ctx.callbackQuery.data){
      case "submit": 
        await saveData(id,TiketSQMProperties)
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
