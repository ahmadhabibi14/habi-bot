import {
  sektorModel,sektor,
  witelModel,witel,
  regionalModel,regional
} from "./Model"

export async function addSektor(Sk: string,point: number){
  try {
    let sekName = await sektorModel.findOne({nama: Sk})
    if(!sekName){
      let newSekName = new sektorModel({
        name : Sk,
        rata_rata : point,
        jumblah : 1
      })
      newSekName.save()
      return
    }  
    sekName.rata_rata = ( sekName.rata_rata * sekName.jumblah + point ) / sekName.jumblah + 1
    sekName.jumblah += 1
    await sektorModel.findOneAndUpdate({nama: Sk},sekName)
  } catch (e) {
    return 
  }
}

export async function addWitel(Sk: string,point: number){
  try {
    let witName = await witelModel.findOne({nama: Sk})
    if(!witName){
      let newWitName = new witelModel({
        name : Sk,
        rata_rata : point,
        jumblah : 1
      })
      newWitName.save()
      return
    }  
    witName.rata_rata = ( witName.rata_rata * witName.jumblah + point ) / witName.jumblah + 1
    witName.jumblah += 1
    await witelModel.findOneAndUpdate({nama: Sk},witName)
  } catch (e) {
    return 
  }
}

export async function addReg(Sk: string,point: number){
  try {
    let regName = await regionalModel.findOne({nama: Sk})
    if(!regName){
      let newRegName = new regionalModel({
        name : Sk,
        rata_rata : point,
        jumblah : 1
      })
      newRegName.save()
      return
    }  
    regName.rata_rata = ( regName.rata_rata * regName.jumblah + point ) / regName.jumblah + 1
    regName.jumblah += 1
    await regionalModel.findOneAndUpdate({nama: Sk},regName)
  } catch (e) {
    return 
  }
}

export async function upSektor(Sk: string,point: number,opr: "+" | "-"){
  try {
    let sekName = await sektorModel.findOne({nama: Sk})
    if(!sekName){
       return
    } 
    if(opr == "+"){ 
      sekName.rata_rata = ( sekName.rata_rata * sekName.jumblah + point ) / sekName.jumblah 
    }else{
      sekName.rata_rata = ( sekName.rata_rata * sekName.jumblah - point ) / sekName.jumblah 
    }
    await sektorModel.findOneAndUpdate({nama: Sk},sekName)
  } catch (e) {
    return 
  }
}
export async function upWitel(Sk: string,point: number,opr: "+" | "-"){
  try {
    let witName = await witelModel.findOne({nama: Sk})
    if(!witName){
      return
    } 
    if(opr == "+"){
      witName.rata_rata = ( witName.rata_rata * witName.jumblah + point ) / witName.jumblah 
    }else{
      witName.rata_rata = ( witName.rata_rata * witName.jumblah - point ) / witName.jumblah 
    }
    await witelModel.findOneAndUpdate({nama: Sk},witName)
  } catch (e) {
    return 
  }
}
export async function upReg(Sk: string,point: number,opr: "+" | "-"){
  try {
    let regName = await regionalModel.findOne({nama: Sk})
    if(!regName){
      return
    }  
    if(opr == "+"){
      regName.rata_rata = ( regName.rata_rata * regName.jumblah + point ) / regName.jumblah 
    }else{
      regName.rata_rata = ( regName.rata_rata * regName.jumblah - point ) / regName.jumblah
    }
    await regionalModel.findOneAndUpdate({nama: Sk},regName)
  } catch (e) {
    return 
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
