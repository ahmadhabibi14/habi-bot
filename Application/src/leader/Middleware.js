"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Controller_1 = require("./Controller");
function extractToken(req, res, next) {
    if (req.headers && req.headers.authorization) {
        let token = req.headers.authorization;
        token = token.split(" ")[1];
        try {
            let User = jsonwebtoken_1.default.verify(token, 'xdxrc');
            if (typeof User != "string")
                (0, Controller_1.NIKLead)(User.data);
        }
        catch (e) {
            res.sendStatus(500);
            return;
        }
    }
    else {
        res.sendStatus(200);
        return;
    }
    next();
}
exports.extractToken = extractToken;
