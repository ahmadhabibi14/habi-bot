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

const teknisi = new mongo.Model(Schema)
export default teknisi
