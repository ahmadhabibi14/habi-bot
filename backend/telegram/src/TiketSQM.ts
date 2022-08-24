import {Scenes} from  "telegraf"
import {TiketSQM,Nub} from "../../src/performansi/Model"
import {updateHandle,getAll,updateUser} from "../../src/teknisi/Service"
//import {upSektor,upWitel,upReg} from "../../src/filtered/Service"

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
  point : 0.5 
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
          let data = TiketSQMProperties
          let ids = data.no_speedy
          let same = false
          let teknisies: any = await getAll()
          for(let i = 0; i < teknisies.length - 1;i++){
            let teknisi = teknisies[i]
            delete teknisi._id
            for(let task of teknisi.Handle){
              let sd = 1000 * 60 * 60 * 24 * 60
              if(task.type != "tiketRegular"){
                continue
              }
              if(
                  task.no_speedy == data.no_speedy && 
                  task.date.getTime() - Date.now() < sd && 
                  task.done == false
              ){
                //console.log("sama")
                teknisi.point -= 2
                let nub: Nub = {
                  type : 'nub',
                  point : 0,
                  done : false,
                  date : new Date()
                }
                teknisi.Handle.push(nub)
               await updateUser(teknisi,id)
                same = true
                ctx.reply("saving data...")
                ctx.scene.enter("Close")
                // await upSektor(teknisi.Sektor,teknisi.point,"-")
                // await upWitel(teknisi.Witel,teknisi.point,"-")
                // await upReg(teknisi.Regional,teknisi.point,"-")
                break
              }
            }
          } 
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
