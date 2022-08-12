import {Scenes} from  "telegraf"
import {TutupODP} from "../../src/performansi/Model"
import {updateHandle} from "../../src/teknisi/Service"

export const TutupODPIdGenerate = new Scenes.BaseScene<Scenes.SceneContext>("TutupODPIdGenerate")
export const TutupODPNamaOdp = new Scenes.BaseScene<Scenes.SceneContext>("TutupODPNamaOdp")
export const TutupODPAlamatOdp = new Scenes.BaseScene<Scenes.SceneContext>("TutupODPAlamatOdp")

async function saveData(id: string,data: TutupODP){
  await updateHandle(data,id)
}

const TutupODPProperties: TutupODP = {
  type : "TutupODP",
  id_generate : "",
  nama_odp : "",
  alamat_odp : "" ,
  point : 0.25
}

TutupODPIdGenerate.enter(ctx=>{
  ctx.reply("kamu melilih Tutup ODP")
  ctx.reply("masukan id generate")
})
TutupODPIdGenerate.on("text",ctx => {
  if(ctx.update.message){
    TutupODPProperties.id_generate = ctx.update.message.text
  }
  ctx.scene.enter("TutupODPNamaOdp")
})

TutupODPNamaOdp.enter(ctx => {
  ctx.reply("masukan nama ODP")
})
TutupODPNamaOdp.on("text",ctx => {
  if(ctx.update.message){
    TutupODPProperties.nama_odp = ctx.update.message.text
  }
  ctx.scene.enter("TutupODPAlamatOdp")
})

TutupODPAlamatOdp.enter(ctx => {
  ctx.reply("masukan alamat ODP")
})
TutupODPAlamatOdp.on("text",ctx => {
  if(ctx.update.message){
     TutupODPProperties.alamat_odp = ctx.update.message.text
  }
  ctx.reply(
    "sumary\n"+
      "Id generate : "+TutupODPProperties.id_generate+"\n"+
      "Nama ODP : "+TutupODPProperties.nama_odp+"\n"+
      "Alamat ODP : "+TutupODPProperties.alamat_odp+"\n"+
      "Jika sudah benar tekan submit.",{
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

TutupODPAlamatOdp.on("callback_query",async ctx =>{
  let id: string = ""
  if(ctx.callbackQuery.from){
    id = ctx.callbackQuery.from.id.toString()
  }
  switch(ctx.callbackQuery.data){
      case "submit": 
        await saveData(id,TutupODPProperties)
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

