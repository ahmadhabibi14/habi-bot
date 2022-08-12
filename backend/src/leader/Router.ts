import {getLeader,createLeader,loginWithToken,logout,isLoginAndLeader,createTeknisi,getTeknisiData} from "./Controller"

export function LeaderRoute(Router:any ){
  Router.post("/leader/login",getLeader)
  Router.post("/leader/signup",createLeader)
  Router.get("/leader/login",loginWithToken)
  Router.get("/leader/logout",logout)

  // LEADER CRUD
  Router.post("/leader/create/teknisi",isLoginAndLeader,createTeknisi)
  Router.post("/leader/info/teknisi",isLoginAndLeader,getTeknisiData)
  // Router.delete("/leader/remove/teknisi")
}
