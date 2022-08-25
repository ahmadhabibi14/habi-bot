import express,{Request,Response} from "express"
import cors from "cors"
import router from "./src/router"
import bot from "./telegram/bot"
import path from "path"
import {ConnectToMongoDb} from "./src/db/Service"
import cookie  from "cookie-parser"
//const screetPath = `/telegraf/${bot.secretPathComponent()}`
//bot.telegram.setWebhook(`${screetPath}`)
const port: number = 8887
const app = express()

//MongoDb Connect
ConnectToMongoDb()
//app.use(bot.webhookCallback(screetPath))
app.use(express.static('./public'))
app.use(cookie())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors({
  origin:"http://localhost:3000",
  credentials: true
}))
app.use(express.static("./view"))
app.use(router) 
app.get("/",(req: Request,res: Response) => {
  res.sendFile(path.resolve('./public/index.html'))
})
app.get("/:all",(req:Request,res: Response) => {
  res.sendFile(path.resolve('./public/index.html'))
})
app.listen(port,()=>{
  console.log("your server has running",port)
  bot.launch()
})


