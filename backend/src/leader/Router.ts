import {
  getLeader,
  createLeader,
  getTeknisiTen,
  loginWithToken,
  logout,
  isLoginAndLeader,
  createTeknisi,
  getTeknisiData,
  addTask,
  getSektorC,
  getWitelC,
  getRegC
} from "./Controller"

export function LeaderRoute(Router:any ){
  Router.post("/leader/login",getLeader)
  Router.post("/leader/signup",createLeader)
  Router.get("/leader/login",loginWithToken)
  Router.get("/leader/logout",logout)
  // TEKNISI DATA
  Router.get("/leader/sektor",isLoginAndLeader,getSektorC)
  Router.get("/leader/witel",isLoginAndLeader,getWitelC)
  Router.get("/leader/regional",isLoginAndLeader,getRegC)
  Router.post("/leader/teknisi",isLoginAndLeader,getTeknisiTen)
  // LEADER CRUD
  Router.post("/leader/create/teknisi",isLoginAndLeader,createTeknisi)
  Router.post("/leader/info/teknisi",isLoginAndLeader,getTeknisiData)
  // POST ADD TASK
  Router.post("/leader/addtask",isLoginAndLeader,addTask)
  // Router.delete("/leader/remove/teknisi")
}
