"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaderRoute = void 0;
const Controller_1 = require("./Controller");
function LeaderRoute(Router) {
    Router.post("/leader/login", Controller_1.getLeader);
    Router.post("/leader/signup", Controller_1.createLeader);
    Router.get("/leader/login", Controller_1.loginWithToken);
    Router.get("/leader/logout", Controller_1.logout);
    // LEADER CRUD
    Router.post("/leader/create/teknisi", Controller_1.isLoginAndLeader, Controller_1.createTeknisi);
    Router.post("/leader/info/teknisi", Controller_1.isLoginAndLeader, Controller_1.getTeknisiData);
    // Router.delete("/leader/remove/teknisi")
}
exports.LeaderRoute = LeaderRoute;
