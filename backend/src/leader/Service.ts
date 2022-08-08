import {LeaderModel,Leader} from "./Model"

async function getLeaderByNik(Nik: number): Promise<Leader | string> {
  let leader: Leader | null
  try {
    leader = await LeaderModel.findOne({NIK: Nik})
    if(!leader){
      return "leader not found"
    }
  }catch(e){
    return ""
  }
  return leader
}

const services = {
  getLeaderByNik
}
export default services
