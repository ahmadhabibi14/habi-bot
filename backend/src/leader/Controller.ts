import {Response,Request} from "express"
import Service from "./Service"

export async function getLeader(req: Request,res: Response){
  let Leader = await Service.getLeaders()
  res.send()
}


