import mongo from "mongoose"
import {dbUrl} from "../../config"

export async function ConnectToMongoDb(){
  try{
    //console.log(dbUrl)
    await mongo.connect(dbUrl)
    console.log(
      "mongodb connected"
    )
  }catch(e){
    //console.log(e)
    console.log(
      "cannot connect to mongodb"
    )
  }
}
