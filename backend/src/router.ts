import {Router} from "express"
import App from "./index"
import {TeknisiRoute} from "./teknisi/Router"
const router = Router()

//implement Router Here
TeknisiRoute(router)

export default router
