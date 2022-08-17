import {Teknisi,TeknisiModel} from "./Model"
import {Task} from "../performansi/Model"

export async function getTeknisi(Nik: number,IDTelegram?: string): Promise<Teknisi | null | undefined>{
  if(Nik != 0){
    let teknisi: Teknisi | null
    try{
      teknisi = await TeknisiModel.findOne({NIK: Nik})
    }catch(e){
      return null
    }
    return teknisi
  }else if(IDTelegram){
    let teknisi: Teknisi | null
    try{
      teknisi = await TeknisiModel.findOne({IDTelegram: IDTelegram})
    }catch(e){
      return null
    }
    return teknisi
  }
}
export async function newTeknisi(Data: Teknisi): Promise<boolean> {
  let teknisi = await getTeknisi(Data.NIK)
  if(!teknisi){
    try {
      let baru = new TeknisiModel(Data)
      baru.save()
      return true
    }catch(e){
      return false
    }
  }
  return false
}

export async function updateHandle(Handle: Task,IdT: string): Promise<null | boolean>{
  let TeknisiOld = await getTeknisi(0,IdT)
  if(!TeknisiOld){
    return null
  }
  TeknisiOld.Handle.push(Handle)
  let point: number = 0
  TeknisiOld.Handle.forEach((element: Task) => {
    point += element.point 
  });  
  TeknisiOld.point = point
  let Update = await TeknisiModel.findOneAndUpdate({IDTelegram: IdT},TeknisiOld)
  if(!Update){
    return null 
  }
  return true
}

export async function updateUser(User: Teknisi,IdT: string): Promise<null | boolean>{
  let TeknisiOld = await getTeknisi(0,IdT)
  if(!TeknisiOld){
    return null
  }
  let Update = await TeknisiModel.findOneAndUpdate({IDTelegram: IdT},User)
  if(!Update){
    return null 
  }
  return true
}
export async function getAll(): Promise<Teknisi[]> {
  let Teknisies = await TeknisiModel.find({})
  return Teknisies
}
//export function updatePoint()
