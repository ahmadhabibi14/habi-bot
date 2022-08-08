"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeknisiRoute = void 0;
const Controller_1 = require("./Controller");
function TeknisiRoute(Router) {
    Router.get("/h", Controller_1.getLeader);
}
exports.TeknisiRoute = TeknisiRoute;
