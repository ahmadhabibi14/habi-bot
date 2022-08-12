import {Scenes} from  "telegraf"
import {TiketRegular} from "../../src/performansi/Model"
import {updateHandle} from "../../src/teknisi/Service"

export const TiketRegularInsiden = new Scenes.BaseScene<Scenes.SceneContext>("TiketRegularInsiden")
export const TiketRegularSpeedy = new Scenes.BaseScene<Scenes.SceneContext>("TiketRegularSpeedy")
export const TiketRegularNamaPelanggan = new Scenes.BaseScene<Scenes.SceneContext>("TiketRegularNamaPelanggan")
export const TiketRegularPerbaikan  = new Scenes.BaseScene<Scenes.SceneContext>("TiketRegularPerbaikan")

type TiketRegularGroup = {
  name: string,
  data: TiketRegular
}
class Temp {
  tmp : TiketRegularGroup[]
  constructor(){
    this.tmp = []
  }
  set(data: TiketRegular,varName: string) {
    let value = this.get(varName)
    if(!value){
      this.tmp.push({name: varName, data})
    }else{
      for(let ident of this.tmp) {
        if(ident.name == varName){
          ident.data = data
          break
        }
      }
     }
  }
  get(varName: string): TiketRegular | undefined {
    let tmpData = this.tmp.find(e => e.name == varName)
    if(!tmpData){
      return undefined
    }
    return tmpData.data
  }
  clear(varName : string) {
    this.tmp = this.tmp.filter((e) => e.name != varName)
  }
}
const TiketRegularTmp = new Temp()
TiketRegularInsiden.enter(ctx => {
  let id = ""
  if(ctx.callbackQuery && ctx.callbackQuery.from){
    id = ctx.callbackQuery.from.id.toString()
  }
  const TiketRegularProperties:TiketRegular = {
    type : "tiketRegular",
    no_insiden : "",
    no_speedy  : "",
    nama_pelanggan : "",
    perbaikan : "",
    point : 1
  }
  TiketRegularTmp.set(TiketRegularProperties,id)

  ctx.reply("kamu memilih Tiket Regular")
  ctx.reply("masukan nomor insiden (INxxx90)")
})
TiketRegularInsiden.on("text",ctx => {
  let id = ""
  if(ctx.update.message.from){
    id = ctx.update.message.from.id.toString()
  } 
  let TiketRegularProperties = TiketRegularTmp.get(id)
  if(TiketRegularProperties == undefined){
    ctx.reply("terjadi masalah tak terduga")
    return
  }
  if(ctx.update.message){
    TiketRegularProperties.no_insiden = ctx.update.message.text
    TiketRegularTmp.set(TiketRegularProperties,id)
  }
  ctx.scene.enter("TiketRegularSpeedy")
})

TiketRegularSpeedy.enter(ctx => {
  ctx.reply("masukan nomor speedy")
})
TiketRegularSpeedy.on("text", ctx => {
  let id = ""
  if(ctx.update.message.from){
    id = ctx.update.message.from.id.toString() 
  }
  let TiketRegularProperties = TiketRegularTmp.get(id)
  if(TiketRegularProperties == undefined){
    return
  }
  if(ctx.update.message) {
    TiketRegularProperties.no_speedy = ctx.update.message.text
    TiketRegularTmp.set(TiketRegularProperties,id)
  }
  ctx.scene.enter("TiketRegularNamaPelanggan")
})

TiketRegularNamaPelanggan.enter(ctx => {
  ctx.reply("masukan nama pelanggan")
})
TiketRegularNamaPelanggan.on("text",ctx => {
  let id = ""
  if(ctx.update.message.from){
    id = ctx.update.message.from.id.toString() 
  }
  let TiketRegularProperties = TiketRegularTmp.get(id)
  if(TiketRegularProperties == undefined){
    return
  }

  if(ctx.update.message){
    TiketRegularProperties.nama_pelanggan = ctx.update.message.text
    TiketRegularTmp.set(TiketRegularProperties,id)
  }
  ctx.scene.enter("TiketRegularPerbaikan")
})

TiketRegularPerbaikan.enter(ctx => {
  ctx.reply("masukan cara perbaikan")
})
TiketRegularPerbaikan.on("text",ctx => {
  let id = ""
  if(ctx.update.message.from){
    id = ctx.update.message.from.id.toString() 
  }
  let TiketRegularProperties = TiketRegularTmp.get(id)
  if(TiketRegularProperties == undefined){
    return
  }
  if(ctx.update.message){
    TiketRegularProperties.perbaikan = ctx.update.message.text
    TiketRegularTmp.set(TiketRegularProperties,id)
  }
  if(TiketRegularProperties != undefined){
    ctx.reply(
      "sumary\n"+
      "No IN : " + TiketRegularProperties.no_insiden+"\n"+
      "No speedy : " + TiketRegularProperties.no_speedy+"\n"+
      "Nama pelanggan : " + TiketRegularProperties.nama_pelanggan+"\n"+
      "Perbaikan : " + TiketRegularProperties.perbaikan + "\n"+
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
  }
})

TiketRegularPerbaikan.on("callback_query",async ctx=>{
  let id: string = ""
  if(ctx.callbackQuery.from){
    id = ctx.callbackQuery.from.id.toString()
  }
  if(ctx.callbackQuery){
    switch(ctx.callbackQuery.data){
      case "submit": 
        let data = TiketRegularTmp.get(id)
        if(data != undefined){
          await saveData(id,data)
          await ctx.reply("saving data...")
          ctx.scene.enter("Close")
        }
        break
      case "cancel":
        ctx.reply("membatalkan...")
        ctx.scene.enter("Close")
        TiketRegularTmp.clear(id)
        break
      default : 
        console.log("")
        break
    }
  }
})

async function saveData(id: string,data: TiketRegular){
  await updateHandle(data,id)
}
