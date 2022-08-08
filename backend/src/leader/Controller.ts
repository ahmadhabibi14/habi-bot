import {Response,Request} from "express"
import Service from "./Service"

// LOGIN
export async function getLeader(req: Request,res: Response){
  const leaderProp = req.body
  let Leader = await Service.getLeaderByNik(leaderProp.NIK)
  if(!Leader){
    res.status(404).json({msg : "leader not found"})
    return 
  }
  
  const password = leaderProp.password
  if(typeof Leader != "string"){
    if(!Service.validatedPass(leaderProp.password,Leader.Password)){
      res.status(400).json({msg:"password wrong"})
      return 
    }
  }
  let jwtNik = Service.jwtNik(leaderProp.Nik,password)
  res.cookie("token",jwtNik,{httpOnly: true})
  if(typeof Leader != "string"){
    let toSend = {
      NIK : Leader.NIK,
      Nama: Leader.Nama,
      IDTelegram : Leader.IDTelegram,
      NamaMitra : Leader.NamaMitra,
      Sektor : Leader.Sektor,
      Witel : Leader.Witel,
      Regional : Leader.Regional,
    }
    res.json(toSend)
    return 
  }
}

export async function loginWithToken(req: Request,res: Response) {}
// SIGNUP
export async function createLeader(req: Request,res: Response){
  const {
    NIK,
    Nama,
    IDTelegram,
    NamaMitra,
    Sektor,
    Witel,
    Regional,
    Password,
    ConfirmPassword,
  } = req.body
  if(ConfirmPassword != Password) {
    res.status(400).json({msg:"password not match"})
    return 
  }
  const hashedPassword = Service.hashingPassword(Password)
  // valide nik not duplicate
  if(!(await Service.checkNik(NIK))){
    res.status(400).json({msg:"nik has usage"})
    return 
  }
  // valide leader has add
  if(!Service.newLeader(
    NIK,
    Nama,
    IDTelegram,
    NamaMitra,
    Sektor,
    Witel,
    Regional,
    hashedPassword,
  )){
    res.status(500).json({msg:"something went wrong"})
    return 
  }

  res.json({msg:"you has added"})
}

