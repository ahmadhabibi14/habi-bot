import * as mongo from "mongoose"
interface Leader {
    NIK : number,
    Nama : string,
    IDTelegram: string,
    NamaMitra: string,
    Sektor: string,
    Witel : string,
    Regional: string,
    Password: string,
}

const LeaderSchema = new mongo.Schema<Leader>({
  NIK : {type : Number, required: true},
  Nama : {type : String, required: true},
  IDTelegram : {type : String, required: true},
  NamaMitra : {type : String, required: true},
  Sektor : {type : String, required: true},
  Witel : {type : String, required: true},
  Regional : {type : String, required: true},
  Password : {type : String, required: true},
})
const LeaderModel = mongo.model<Leader>('leader',LeaderSchema)
export {LeaderModel,Leader}
