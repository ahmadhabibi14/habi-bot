import {Router} from "express"
import App from "./index"
import {TeknisiRoute} from "./teknisi/Router"
import {LeaderRoute} from "./leader/Router"
const router = Router()

//implement Router Here
TeknisiRoute(router)
LeaderRoute(router)

export default router
