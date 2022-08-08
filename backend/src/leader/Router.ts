import {getLeader,createLeader,loginWithToken} from "./Controller"

export function LeaderRoute(Router:any ){
  Router.post("/leader/login",getLeader)
  Router.post("/leader/signup",createLeader)
  Router.get("/leader/login",loginWithToken)
}
