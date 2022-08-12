import express from "express"
import cors from "cors"
import router from "./src/router"
import bot from "./telegram/bot"
import {ConnectToMongoDb} from "./src/db/Service"
import cookie  from "cookie-parser"
//const screetPath = `/telegraf/${bot.secretPathComponent()}`
//bot.telegram.setWebhook(`${screetPath}`)
const port: number = 8887
const app = express()

//MongoDb Connect
ConnectToMongoDb()
//app.use(bot.webhookCallback(screetPath))
app.use(cookie())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use(express.static("./view"))
app.use(router)
 
app.listen(port,()=>{
  console.log("your server has running",port)
  bot.launch()
})


