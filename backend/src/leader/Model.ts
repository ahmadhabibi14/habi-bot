import * as mongo from "mongoose"
const Schema = new mongo.Schema(
  {
    NIK : Number,
    Nama : String,
    IDTelegram: String,
    NamaMitra: String,
    Sektor: String,
    Witel : String,
    Regional: String
  }
)
type Leader = {
    NIK : Number,
    Nama : String,
    IDTelegram: String,
    NamaMitra: String,
    Sektor: String,
    Witel : String,
    Regional: String 
}
const LeaderModel = new mongo.Model(Schema)
export {LeaderModel,Leader}
