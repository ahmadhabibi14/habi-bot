import {getLeader} from "./Controller"

export function LeaderRoute(Router:any ){
  Router.get("/leader/signup",getLeader)
}
