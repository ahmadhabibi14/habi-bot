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
exports.addTask = exports.getTeknisiTen = exports.getTeknisiData = exports.createTeknisi = exports.isLoginAndLeader = exports.logout = exports.createLeader = exports.loginWithToken = exports.getLeader = void 0;
const Service_1 = __importDefault(require("./Service"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Service_2 = require("../teknisi/Service");
// LOGIN
function getLeader(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const leaderProp = req.body;
        let Leader = yield Service_1.default.getLeaderByNik(leaderProp.NIK);
        if (!Leader) {
            res.status(404).json({ msg: "leader not found" });
            return;
        }
        const password = leaderProp.password;
        if (typeof Leader != "string") {
            if (!Service_1.default.validatedPass(leaderProp.password, Leader.Password)) {
                res.status(400).json({ msg: "password wrong" });
                return;
            }
        }
        let jwtNik = Service_1.default.jwtNik(leaderProp.NIK);
        res.cookie("token", jwtNik);
        if (typeof Leader != "string") {
            let toSend = {
                NIK: Leader.NIK,
                Nama: Leader.Nama,
                IDTelegram: Leader.IDTelegram,
                NamaMitra: Leader.NamaMitra,
                Sektor: Leader.Sektor,
                Witel: Leader.Witel,
                Regional: Leader.Regional,
            };
            res.json(toSend);
            return;
        }
    });
}
exports.getLeader = getLeader;
//LOGIN DIRECT
function loginWithToken(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!req.headers.cookie) {
            res.status(404).json({ msg: "must be login first" });
            return;
        }
        let k;
        if (req.headers && req.headers.cookie && typeof req.headers.cookie == "string") {
            k = jsonwebtoken_1.default.verify(req.headers.cookie.split("token=")[1], "xdxrc");
        }
        let nik = 0;
        if (typeof k != "string") {
            nik = k.data;
        }
        let Leader = yield Service_1.default.getLeaderByNik(nik);
        if (!Leader) {
            res.status(404).json({ msg: "leader not found" });
            return;
        }
        if (typeof Leader != "string") {
            let toSend = {
                NIK: Leader.NIK,
                Nama: Leader.Nama,
                IDTelegram: Leader.IDTelegram,
                NamaMitra: Leader.NamaMitra,
                Sektor: Leader.Sektor,
                Witel: Leader.Witel,
                Regional: Leader.Regional,
            };
            res.json(toSend);
            return;
        }
    });
}
exports.loginWithToken = loginWithToken;
// SIGNUP
function createLeader(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { NIK, Nama, IDTelegram, NamaMitra, Sektor, Witel, Regional, Password, ConfirmPassword, } = req.body;
        if (ConfirmPassword != Password) {
            res.status(400).json({ msg: "password not match" });
            return;
        }
        const hashedPassword = Service_1.default.hashingPassword(Password);
        // valide nik not duplicate
        if (!(yield Service_1.default.checkNik(NIK))) {
            res.status(400).json({ msg: "nik has usage" });
            return;
        }
        // valide leader has add
        if (!Service_1.default.newLeader(NIK, Nama, IDTelegram, NamaMitra, Sektor, Witel, Regional, hashedPassword)) {
            res.status(500).json({ msg: "something went wrong" });
            return;
        }
        res.json({ msg: "you has added" });
    });
}
exports.createLeader = createLeader;
// LOGOUT
function logout(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!req.headers.cookie) {
            res.status(404).json({ msg: "must be login first" });
            return;
        }
        res.clearCookie("token");
        res.json({ msg: "logout succes" });
    });
}
exports.logout = logout;
// Middleware
function isLoginAndLeader(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!req.headers.cookie) {
            res.status(404).json({ msg: "must be login first" });
            return;
        }
        let k;
        if (req.headers && req.headers.cookie && typeof req.headers.cookie == "string") {
            k = jsonwebtoken_1.default.verify(req.headers.cookie.split("token=")[1], "xdxrc");
        }
        let nik = 0;
        if (typeof k != "string") {
            nik = k.data;
        }
        let Leader = yield Service_1.default.getLeaderByNik(nik);
        if (!Leader) {
            res.status(404).json({ msg: "leader not found" });
            return;
        }
        next();
    });
}
exports.isLoginAndLeader = isLoginAndLeader;
// Create Teknisi
function createTeknisi(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const TeknisiData = req.body;
        let succes = yield (0, Service_2.newTeknisi)(TeknisiData);
        if (succes) {
            res.json({ msg: "teknisi has added" });
            return;
        }
        res.status(400).json({ msg: "cannot added teknisi" });
    });
}
exports.createTeknisi = createTeknisi;
function getTeknisiData(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { NIK } = req.body;
        try {
            let Data = yield (0, Service_2.getTeknisi)(NIK);
            if (!Data) {
                return res.status(404).json({ msg: "teknisi not defined" });
            }
            res.json(Data);
            return;
        }
        catch (e) {
            res.sendStatus(500);
            return;
        }
    });
}
exports.getTeknisiData = getTeknisiData;
function getTeknisiTen(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { from, to } = req.body;
        const teknisi = yield (0, Service_2.getAll)();
        res.json(teknisi.slice(from, to));
    });
}
exports.getTeknisiTen = getTeknisiTen;
function addTask(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let succes = yield (0, Service_2.addLeadTask)(req.body);
        if (succes) {
            res.json({ msg: "succesfull set task" });
            return;
        }
        res.status(500).json({ msg: "error set task" });
    });
}
exports.addTask = addTask;
