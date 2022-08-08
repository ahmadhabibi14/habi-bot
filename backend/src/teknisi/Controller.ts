import {Response,Request} from "express"
import Service from "./Service"

export function teknisi(req: Request,res: Response){
  res.send(Service.hi())
}


