"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
//import {TeknisiRoute} from "./teknisi/Router"
const Router_1 = require("./leader/Router");
const router = (0, express_1.Router)();
//implement Router Here
(0, Router_1.LeaderRoute)(router);
exports.default = router;
