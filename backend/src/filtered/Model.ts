import * as mongo from "mongoose"
interface sektor {
  name : string,
}
interface witel {
  //rata_rata : number,
  name : string,
  sektor? : string[]
  //jumblah : number
}
interface regional {
  //rata_rata : number,
  witel?: string[],
  name : string,
  //jumblah : number
}

const sektorSchema = new mongo.Schema<sektor>({
  //rata_rata: {type: Number, required: true},
  name: {type: String, required: true},
  //jumblah: {type: Number, required: true}
})
const sektorModel = mongo.model<sektor>("sektor1",sektorSchema)

const witelSchema = new mongo.Schema<witel>({
  //rata_rata: {type: Number, required: true},
  name: {type: String, required: true},
  sektor : { type : Array},
  //jumblah: { type: Number, required: true}
})
const witelModel = mongo.model<witel>("witel1",witelSchema)

const regionalSchema = new mongo.Schema<regional>({
  //rata_rata: {type: Number, required: true},
  name: {type: String, required: true},
  witel : {type : Array},
  //jumblah: {type: Number, required: true}
})
const regionalModel = mongo.model<regional>("regional1",regionalSchema)

export {
  sektor,
  witel,
  regional,
  sektorModel,
  witelModel,
  regionalModel
}
