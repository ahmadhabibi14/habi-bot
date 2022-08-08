import {getLeader} from "./Controller"

export function TeknisiRoute(Router:any ){
  Router.get("/h",getLeader)
}
