import express from "express"
import cors from "cors"
import router from "./src/router"
import bot from "./telegram/bot"

const screetPath = `/telegraf/${bot.secretPathComponent()}`
const port: number = 8888
const app = express()

app.use(bot.webhookCallback(screetPath))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use(express.static("./view"))
app.use(router)
 
app.listen(port,()=>{
  console.log("your server has running",port)
})


