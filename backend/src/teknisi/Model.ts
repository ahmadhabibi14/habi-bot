import * as mongo from "mongoose"
import {
  TiketRegular,
  TutupODP,
  LaporLangsung,
  TiketSQM,
  Proman,
  Unspect,
  Valins,
  Task
} from "../performansi/Model"
interface Teknisi {
    NIK : number,
    Nama : string,
    IDTelegram: string,
    NamaMitra: string,
    Sektor: string,
    Witel : string,
    Regional: string,
    Handle: Array<Task>,
    point : number
}

const TeknisiSchema = new mongo.Schema<Teknisi>({
  NIK : {type : Number, required: true},
  Nama : {type : String, required: true},
  IDTelegram : {type : String, required: true},
  NamaMitra : {type : String, required: true},
  Sektor : {type : String, required: true},
  Witel : {type : String, required: true},
  Regional : {type : String, required: true},
  Handle : [{type : mongo.Schema.Types.Mixed}],
  point : {type : Number, required: true}
})
const TeknisiModel = mongo.model<Teknisi>('Teknisi',TeknisiSchema)
export {TeknisiModel,Teknisi}
