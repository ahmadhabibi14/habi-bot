import {Telegraf,Scenes,session} from "telegraf"
import {botToken} from "../config"
import {Task,TiketRegular} from "../src/performansi/Model"
import {updateUser} from "../src/teknisi/Service"
import {
  TiketRegularInsiden,
  TiketRegularSpeedy,
  TiketRegularNamaPelanggan,
  TiketRegularPerbaikan
} from "./src/TiketRegular"

import {
  LaporLangsungIdGenerate,
  LaporLangsungSpeedy,
  LaporLangsungNamaPelanggan,
  LaporLangsungCpPelanggan,
  LaporLangsungPerbaikan 
} from "./src/LaporLangsung"

import {
  TutupODPIdGenerate,
  TutupODPNamaOdp,
  TutupODPAlamatOdp,
} from "./src/TutupOdp"

import {
  TiketSQMNoInsiden,
  TiketSQMNoSpeedy,
  TiketSQMNamaPelanggan,
  TiketSQMPerbaikan
} from "./src/TiketSQM"

import {
  PromanIdGenerate, 
  PromanNamaODP,
  PromanDistribusi, 
  PromanKapasitasPort,
  PromanStatusPortIsi,
  PromanStatusPortKosong,
  PromanOdpGendong,
  PromanHasilUkurOpm
} from "./src/Proman"

import {
  UnspectIdGenerate,
  UnspectNoSpeedy,
  UnspectODP,
  UnspectPerbaikan
} from "./src/Unspect"

import {
  ValinsIdValins,
  ValinsNamaOdp
} from "./src/Valins"

import {getTeknisi} from "../src/teknisi/Service"

//Standard Declration
const bot  = new Telegraf<Scenes.SceneContext>(botToken)
let sessionID = 0

//Control Flow
const Start = new Scenes.BaseScene<Scenes.SceneContext>("Start")
const Close = new Scenes.BaseScene<Scenes.SceneContext>("Close")
const stage = new Scenes.Stage<Scenes.SceneContext>([
  //1
  TiketRegularInsiden,
  TiketRegularSpeedy,
  TiketRegularNamaPelanggan,
  TiketRegularPerbaikan,
  //2
  LaporLangsungIdGenerate,
  LaporLangsungSpeedy,
  LaporLangsungNamaPelanggan,
  LaporLangsungCpPelanggan,
  LaporLangsungPerbaikan,
  //3
  TutupODPIdGenerate,
  TutupODPNamaOdp,
  TutupODPAlamatOdp,
  //4
  TiketSQMNoInsiden,
  TiketSQMNoSpeedy,
  TiketSQMNamaPelanggan,
  TiketSQMPerbaikan,
  //5
  PromanIdGenerate, 
  PromanNamaODP,
  PromanDistribusi, 
  PromanKapasitasPort,
  PromanStatusPortIsi,
  PromanStatusPortKosong,
  PromanOdpGendong,
  PromanHasilUkurOpm,
  //6
  UnspectIdGenerate,
  UnspectNoSpeedy,
  UnspectODP,
  UnspectPerbaikan,
  //7
  ValinsIdValins,
  ValinsNamaOdp,
  //8
  Start,
  Close
],
  {
    ttl: 10
  }
)

bot.use(session())
bot.use(stage.middleware())
bot.command("id",ctx => {
  if(ctx.update.message.from){
    let msg = ctx.update.message.from.id.toString()
    ctx.reply(`id kamu ${msg}, minta leader mendaftarkan-nya`)
  }
})
bot.command("task",async ctx => {
  let teknisiTasks: Task[]
  if(!sessionID && ctx.update.message && ctx.update.message.from){
    sessionID = ctx.update.message.from.id
  }
  if(ctx.update && ctx.update.message && sessionID != ctx.update.message.from.id){
    ctx.reply("teknisi lain sedang menggunakan layanan")
    ctx.reply("silahkan tunggu...")
    let watch = setInterval(()=>{
      if(sessionID == 0){
        ctx.reply("teknisi sudah selesai menggunakan, dan kini bot siap di gunakan olehmu")
        clearInterval(watch)
      }
    },100)
  }else{
  // Teknisi
    if(ctx.update.message.from){
      let teknisi = await getTeknisi(0,ctx.update.message.from.id.toString())
      if(!teknisi){
        ctx.reply("kamu bukan teknisi")
        return 
      }
      teknisiTasks = teknisi.Handle
      console.log(teknisiTasks)
      let i = 0
      for(let task of teknisiTasks){
        i++
        //if(task instanceof TiketRegular && task.type === "tiketRegular"){
        let done = "sudah"
        if(!task.done){
          done = "belum"
        }
        ctx.reply(          
          "Jenis : "+task.type +"\n"+
          "Id : "+i.toString()+"\n"+
          "Selesai : "+done+""
        )
      }
      i = 0
    }
  } 
})
bot.command("selesai",async ctx => {
  if(ctx.update.message.from){
    let teknisi = await getTeknisi(0,ctx.update.message.from.id.toString())
    let id = ctx.update.message.text 
    id = id.split("/selesai ")[1]
    if(!teknisi){
      ctx.reply("kamu bukan teknisi")
      return
    }
    try{
      console.log(id)
      teknisi.Handle[Number(id)-1].done = true
      await updateUser(teknisi,sessionID.toString())
      ctx.reply("task "+id+" sudah di selesaikan")
    }catch{
      ctx.reply("task id salah")
    }
  }

})
bot.command("start",async ctx => {
  //SESSION ID
  if(!sessionID && ctx.update.message && ctx.update.message.from){
    sessionID = ctx.update.message.from.id
  }
  if(ctx.update && ctx.update.message && sessionID != ctx.update.message.from.id){
    ctx.reply("teknisi lain sedang menggunakan layanan")
    ctx.reply("silahkan tunggu...")
    let watch = setInterval(()=>{
      if(sessionID == 0){
        ctx.reply("teknisi sudah selesai menggunakan, dan kini bot siap di gunakan olehmu")
        clearInterval(watch)
      }
    },100)
  }else{
  // Teknisi
    if(ctx.update.message.from){
      let teknisi = await getTeknisi(0,ctx.update.message.from.id.toString())
      if(!teknisi){
        ctx.reply("kamu bukan teknisi")
        return
       }
    }
    ctx.scene.enter("Start")
  }
})

Start.enter(ctx => {
  ctx.reply("Silahkan Pilih",{
    reply_markup :
      {
        inline_keyboard : [
          [
            {text:"Tiket Regular",callback_data: "tiket_regular"},
            {text:"Lapor Langsung",callback_data: "lapor_langsung"}
          ],[
            {text:"Tutup ODP",callback_data: "tutup_odp"},
            {text:"Tiket SQM",callback_data: "tiket_sqm"}
          ],[
            {text:"Proman",callback_data: "proman"},
            {text:"Unspect",callback_data: "unspect"}
          ],[
            {text:"Valins",callback_data: "valins"},
          ]
        ]
      }
  })
})

Start.on("callback_query",(ctx)=>{
  if(ctx.callbackQuery){
    switch(ctx.callbackQuery.data){
      case "tiket_regular": 
        ctx.scene.enter("TiketRegularInsiden")
        break
      case "lapor_langsung":
        ctx.scene.enter("LaporLangsungIdGenerate")
        break
      case "tutup_odp": 
        ctx.scene.enter("TutupODPIdGenerate")
        break
      case "tiket_sqm": 
        ctx.scene.enter("TiketSQMNoInsiden")
        break
      case "proman":
        ctx.scene.enter("PromanIdGenerate")
        break
      case "unspect":
        ctx.scene.enter("UnspectIdGenerate")
        break
      case "valins":
        ctx.scene.enter("ValinsIdValins")
        break
      default : 
        break
    }
  }
})

Close.enter(ctx =>{
  sessionID = 0
  ctx.scene.leave()
})

export default bot
