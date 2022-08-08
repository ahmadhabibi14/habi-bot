"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Router_1 = require("./teknisi/Router");
const router = (0, express_1.Router)();
//implement Router Here
(0, Router_1.TeknisiRoute)(router);
exports.default = router;
