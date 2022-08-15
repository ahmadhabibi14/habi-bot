import {Scenes} from  "telegraf"
import {Proman} from "../../src/performansi/Model"
import {updateHandle} from "../../src/teknisi/Service"

export const PromanIdGenerate = new Scenes.BaseScene<Scenes.SceneContext>("PromanIdGenerate")
export const PromanNamaODP = new Scenes.BaseScene<Scenes.SceneContext>("PromanNamaODP")
export const PromanDistribusi = new Scenes.BaseScene<Scenes.SceneContext>("PromanDistribusi")
export const PromanKapasitasPort = new Scenes.BaseScene<Scenes.SceneContext>("PromanKapasitasPort")
export const PromanStatusPortIsi = new Scenes.BaseScene<Scenes.SceneContext>("PromanStatusPortIsi")
export const PromanStatusPortKosong = new Scenes.BaseScene<Scenes.SceneContext>("PromanStatusPortKosong")
export const PromanOdpGendong = new Scenes.BaseScene<Scenes.SceneContext>("PromanOdpGendong")
export const PromanHasilUkurOpm = new Scenes.BaseScene<Scenes.SceneContext>("PromanHasilUkurOpm")

async function saveData(id: string,data: Proman){
  await updateHandle(data,id)
}

const PromanProperties = {
  type : "Proman",
  id_generate : "",
  done : false,
  nama_odp : "",
  distribusi : "",
  kapasitas_port : "",
  status_port_isi : "",
  status_port_kosong : "",
  odp_gendong : "",
  hasil_ukur_opm : "",
  date : new Date(),
  point : 1
}

PromanIdGenerate.enter(ctx => {
  ctx.reply("kamu memilih Proman")
  ctx.reply("masukan id generate")
})
PromanIdGenerate.on("text",ctx => {
  if(ctx.update.message){
    PromanProperties.id_generate = ctx.update.message.text
  }
  ctx.scene.enter("PromanNamaODP")
})

PromanNamaODP.enter(ctx => {
  ctx.reply("masukan nama ODP ")
})
PromanNamaODP.on("text",(ctx) => {
  if(ctx.update.message){
    PromanProperties.nama_odp = ctx.update.message.text
  }
  ctx.scene.enter("PromanDistribusi")
})

PromanDistribusi.enter(cx => {
  cx.reply("masukan distribusi")
})
PromanDistribusi.on("text",ctx => {
  if(ctx.update.message){
    PromanProperties.distribusi = ctx.update.message.text
  }
  ctx.scene.enter("PromanKapasitasPort")
})

PromanKapasitasPort.enter(ctx => {
  ctx.reply("masukan kapasitas port")
})
PromanKapasitasPort.on("text",(ctx)=>{
  if(ctx.update.message){
    PromanProperties.kapasitas_port = ctx.update.message.text
  }
  ctx.scene.enter("PromanStatusPortIsi")
})

PromanStatusPortIsi.enter(ctx => {
  ctx.reply("masukan status port isi")
})
PromanStatusPortIsi.on("text",ctx => {
  if(ctx.update.message){
    PromanProperties.status_port_isi = ctx.update.message.text
  }
  ctx.scene.enter("PromanStatusPortKosong")
})

PromanStatusPortKosong.enter(ctx => {
  ctx.reply("masukan status port isi")
})
PromanStatusPortKosong.on("text",ctx => {
  if(ctx.update.message){
    PromanProperties.status_port_kosong = ctx.update.message.text
  }
  ctx.scene.enter("PromanOdpGendong")
})

PromanOdpGendong.enter(ctx => {
  ctx.reply("masukan status port isi")
})
PromanOdpGendong.on("text",ctx => {
  if(ctx.update.message){
    PromanProperties.odp_gendong = ctx.update.message.text
  }
  ctx.scene.enter("PromanHasilUkurOpm")
})

PromanHasilUkurOpm.enter(ctx => {
  ctx.reply("masukan status port isi")
})
PromanHasilUkurOpm.on("text",ctx => {
  if(ctx.update.message){
    PromanProperties.hasil_ukur_opm = ctx.update.message.text
  }
  ctx.reply(
    "summary\n"+
      "Id generate :" + PromanProperties.id_generate+"\n"+
      "Distribusi :" + PromanProperties.distribusi+"\n"+
      "Kapasitas port :" + PromanProperties.kapasitas_port+"\n"+
      "Status port isi :" + PromanProperties.status_port_isi+"\n"+
      "Status port kosong :" + PromanProperties.status_port_kosong+"\n"+
      "Odp gendong :" + PromanProperties.odp_gendong+"\n"+
      "Hasil ukur opm :" + PromanProperties.hasil_ukur_opm+"\n"+
      "Jika sudah benar klik submit",{
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

PromanHasilUkurOpm.on("callback_query",async ctx =>{
  let id: string = ""
  if(ctx.callbackQuery.from){
    id = ctx.callbackQuery.from.id.toString()
  }
  switch(ctx.callbackQuery.data){
      case "submit": 
        await saveData(id,PromanProperties)
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

