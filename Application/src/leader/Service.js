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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Model_1 = require("./Model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
function getLeaderByNik(Nik) {
    return __awaiter(this, void 0, void 0, function* () {
        let leader;
        try {
            leader = yield Model_1.LeaderModel.findOne({ NIK: Nik });
            if (!leader) {
                return "";
            }
        }
        catch (e) {
            return "";
        }
        return leader;
    });
}
function validatedPass(pass, hasspass) {
    bcrypt_1.default.compare(pass, hasspass, function (err) {
        if (err) {
            return false;
        }
    });
    return true;
}
function jwtNik(nik) {
    return jsonwebtoken_1.default.sign({ data: nik }, "xdxrc");
}
/*
  SIGN UP SERVICE
  */
function hashingPassword(password) {
    const salt = bcrypt_1.default.genSaltSync(10);
    const hash = bcrypt_1.default.hashSync(password, salt);
    return hash;
}
function checkNik(NIK) {
    return __awaiter(this, void 0, void 0, function* () {
        const leadByNik = yield getLeaderByNik(NIK);
        if (leadByNik) {
            return false;
        }
        console.log(leadByNik);
        return true;
    });
}
function newLeader(NIK, Nama, IDTelegram, NamaMitra, Sektor, Witel, Regional, Password) {
    const User = new Model_1.LeaderModel({
        NIK,
        Nama,
        IDTelegram,
        NamaMitra,
        Sektor,
        Witel,
        Regional,
        Password
    });
    try {
        User.save();
    }
    catch (e) {
        return false;
    }
    return true;
}
const services = {
    getLeaderByNik,
    hashingPassword,
    checkNik,
    newLeader,
    jwtNik,
    validatedPass
};
exports.default = services;
