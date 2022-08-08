import {LeaderModel,Leader} from "./Model"

async function getLeaders(): Promise<Leader> {
  let leaders = await LeaderModel.find({})
  return leaders
}

const services = {
  getLeaders
}
export default services
