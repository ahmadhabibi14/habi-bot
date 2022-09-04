import {LeaderModel,Leader} from "./Model"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"


async function getLeaderByNik(Nik: number): Promise<Leader | string> {
  let leader: Leader | null
  try {
    leader = await LeaderModel.findOne({NIK: Nik})
    if(!leader){
      return ""
    }
  }catch(e){
    return ""
  }
  return leader
}

function validatedPass(pass: string,hasspass: string): boolean{
  bcrypt.compare(pass,hasspass,function(err){
    if(err){
      return false
    }
  })
  return true
}

function jwtNik(nik: number): string {
  return jwt.sign({data: nik},"xdxrc")
}
/*
  SIGN UP SERVICE
  */
function hashingPassword(password: string): string {
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(password,salt)
  return hash
}
async function checkNik(NIK: number): Promise<boolean> {
  const leadByNik = await getLeaderByNik(NIK)
  if(leadByNik){
    return false
  }
  console.log(leadByNik)
  return true
}
function newLeader(    
    NIK : number,
    Nama : string,
    IDTelegram: string,
    NamaMitra: string,
    Sektor: string,
    Witel : string,
    Regional: string,
    Password: string,
): boolean {
  const User = new LeaderModel({
    NIK,
    Nama,
    IDTelegram,
    NamaMitra,
    Sektor,
    Witel,
    Regional,
    Password
  })

  try {
    User.save()
  }catch(e){
    return false
  }
  return true
}

const services = {
  getLeaderByNik,
  hashingPassword,
  checkNik,
  newLeader,
  jwtNik,
  validatedPass
}
export default services
