"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Router_1 = require("./teknisi/Router");
const Router_2 = require("./leader/Router");
const router = (0, express_1.Router)();
//implement Router Here
(0, Router_1.TeknisiRoute)(router);
(0, Router_2.LeaderRoute)(router);
exports.default = router;
