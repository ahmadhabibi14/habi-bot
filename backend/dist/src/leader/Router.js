"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaderRoute = void 0;
const Controller_1 = require("./Controller");
function LeaderRoute(Router) {
    Router.get("/leader/signup", Controller_1.getLeader);
}
exports.LeaderRoute = LeaderRoute;
