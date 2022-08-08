import {Response,Request} from "express"
import Service from "./Service"

export async function getLeader(req: Request,res: Response){
  const leaderProp = req.body
  let Leader = await Service.getLeaderByNik(leaderProp.Nik)
  res.send(Leader)
}


