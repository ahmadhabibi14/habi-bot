import {
  sektorModel,sektor,
  witelModel,witel,
  regionalModel,regional
} from "./Model"

export async function addSektor(Sk: string,point: number,witel: string){
  try {
    let sekName:any = await sektorModel.findOne({name: Sk})
    delete sekName._id
    //console.log(Sk) 
    //console.log(sekName)
    if(!sekName){
      let newSekName = new sektorModel({
        name : Sk,
        rata_rata : point,
        jumblah : 1
      })
      newSekName.save() 
      // Update witel
      let Witel: any = await witelModel.findOne({name: witel})
      if(!Witel){
        return 
      }
      Witel.sektor.push(Sk)
      if(Witel._id) delete Witel._id
      await witelModel.findOneAndUpdate({name: witel},Witel)
      return
    }  
    sekName.rata_rata = ( sekName.rata_rata * sekName.jumblah + point ) / sekName.jumblah + 1
    sekName.jumblah += 1
    await sektorModel.findOneAndUpdate({name: Sk},sekName)
  } catch (e) {
    return 
  }
}

export async function addWitel(Sk: string,point: number,regional: string){
  try {
    let witName:any = await witelModel.findOne({name: Sk})
    delete witName._id
    if(!witName){
      let newWitName = new witelModel({
        name : Sk,
        rata_rata : point,
        jumblah : 1
      })
      newWitName.save()
      let Regional: any = await regionalModel.findOneAndUpdate({name: regional})
      if(!Regional){
        return 
      }
      Regional.witel.push(Sk)
      if(Regional._id) delete Regional._id
      await regionalModel.findOneAndUpdate({name: regional},Regional)
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
    let regName: any = await regionalModel.findOne({name: Sk})
    delete regName._id
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
    await regionalModel.findOneAndUpdate({name: Sk},regName)
  } catch (e) {
    return 
  }
}

export async function upSektor(Sk: string,point: number,opr: "+" | "-"){
  try {
    let sekName: any = await sektorModel.findOne({name: Sk})
    delete sekName._id
    if(!sekName){
       return
    } 
    if(opr == "+"){ 
      sekName.rata_rata = ( sekName.rata_rata * sekName.jumblah + point ) / sekName.jumblah 
    }else{
      sekName.rata_rata = ( sekName.rata_rata * sekName.jumblah - point ) / sekName.jumblah 
    }
    await sektorModel.findOneAndUpdate({name: Sk},sekName)
  } catch (e) {
    return 
  }
}
export async function upWitel(Sk: string,point: number,opr: "+" | "-"){
  try {
    let witName:any = await witelModel.findOne({name: Sk})
    delete witName._id
    if(!witName){
      return
    } 
    if(opr == "+"){
      witName.rata_rata = ( witName.rata_rata * witName.jumblah + point ) / witName.jumblah 
    }else{
      witName.rata_rata = ( witName.rata_rata * witName.jumblah - point ) / witName.jumblah 
    }
    await witelModel.findOneAndUpdate({name: Sk},witName)
  } catch (e) {
    return 
  }
}
export async function upReg(Sk: string,point: number,opr: "+" | "-"){
  try {
    let regName: any = await regionalModel.findOne({name: Sk})
    delete regName._id
    if(!regName){
      return
    }  
    if(opr == "+"){
      regName.rata_rata = ( regName.rata_rata * regName.jumblah + point ) / regName.jumblah 
    }else{
      regName.rata_rata = ( regName.rata_rata * regName.jumblah - point ) / regName.jumblah
    }
    await regionalModel.findOneAndUpdate({name: Sk},regName)
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
