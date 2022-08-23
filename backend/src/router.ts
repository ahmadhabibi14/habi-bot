import { Router } from "express"
//import {TeknisiRoute} from "./teknisi/Router"
import { LeaderRoute } from "./leader/Router"
const router = Router()

//implement Router Here
LeaderRoute(router)

export default router
