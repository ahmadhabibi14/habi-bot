import {
  sektorModel,sektor,
  witelModel,witel,
  regionalModel,regional
} from "./Model"

/*
  @param regional : regional name of a new teknisi
  @param witel : witel name of a new teknisi
  @param sektor : sektor name of a new teknisi
  @function puporse : {
    create and store regional on database
  }
*/

export async function addFilter(regional: string, witel: string, sektor: string) {
  let regionalData: any = await regionalModel.findOne({name: regional})
  if(!regionalData){
    let newRegionalData = new regionalModel({
      name: regional,
      witel : [witel],
    })
    newRegionalData.save()
  } else {
    // assign witel to this regional
    if(!regionalData.witel.find( (e: string) => e == witel)){
     regionalData.witel.push(witel)
    }
    let regionalDataWithoutId = {
      name : regionalData.name,
      witel : regionalData.witel
    }
    await regionalModel.findOneAndUpdate({name: regional}, regionalDataWithoutId)
  }
  /*
    witel configuration here
  */
  let witelData: any = await witelModel.findOne({name: witel})
  if(!witelData){
    let newWitelData = new witelModel({
      name : witel,
      sektor: [sektor]
    })
    newWitelData.save()
  }else {
    if(!witelData.sektor.find( (e: string) => e == sektor)){
      witelData.sektor.push(sektor)
    }
    let witelDataWithoutId = {
      name : witelData.name,
      sektor : witelData.sektor
    }
    await witelModel.findOneAndUpdate({name: witel},witelDataWithoutId)
  }


  /*
    last is sektor
  */
  let sektorData: any = await sektorModel.findOne({name: sektor})
  if(!sektorData){
    new sektorModel({
      name : sektor,
    }).save()
  }
}

export async function getSektor(): Promise<sektor[] | null> {
  return await sektorModel.find({})
}
export async function getWitel(): Promise<witel[] | null> {
  return await witelModel.find({})
}
export async function getReg(): Promise<regional[] | null> {
  return await regionalModel.find({})
}
