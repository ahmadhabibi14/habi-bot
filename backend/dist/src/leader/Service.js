"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Model_1 = require("./Model");
function getLeaderByNik(Nik) {
    return __awaiter(this, void 0, void 0, function* () {
        let leader;
        try {
            leader = yield Model_1.LeaderModel.findOne({ NIK: Nik });
            if (!leader) {
                return "leader not found";
            }
        }
        catch (e) {
            return "";
        }
        return leader;
    });
}
const services = {
    getLeaderByNik
};
exports.default = services;
