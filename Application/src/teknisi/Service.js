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
exports.addLeadTask = exports.getAll = exports.updateUser = exports.updateHandle = exports.newTeknisi = exports.getTeknisi = void 0;
const Model_1 = require("./Model");
const bot_1 = require("../../telegram/bot");
const Service_1 = require("../filtered/Service");
//function createSektor(sektoName: string){}
function getTeknisi(Nik, IDTelegram) {
    return __awaiter(this, void 0, void 0, function* () {
        if (Nik != 0) {
            let teknisi;
            try {
                teknisi = yield Model_1.TeknisiModel.findOne({ NIK: Nik });
            }
            catch (e) {
                return null;
            }
            return teknisi;
        }
        else if (IDTelegram) {
            let teknisi;
            try {
                teknisi = yield Model_1.TeknisiModel.findOne({ IDTelegram: IDTelegram });
            }
            catch (e) {
                return null;
            }
            return teknisi;
        }
    });
}
exports.getTeknisi = getTeknisi;
function newTeknisi(Data) {
    return __awaiter(this, void 0, void 0, function* () {
        let teknisi = yield getTeknisi(Data.NIK);
        if (!teknisi) {
            try {
                let baru = new Model_1.TeknisiModel(Data);
                baru.save();
                console.log(Data.Sektor);
                yield (0, Service_1.addFilter)(Data.Regional, Data.Witel, Data.Sektor);
                // await addWitel(Data.Witel,Data.point,Data.Regional)
                // await addReg(Data.Regional,Data.point)
                return true;
            }
            catch (e) {
                return false;
            }
        }
        return false;
    });
}
exports.newTeknisi = newTeknisi;
function updateHandle(Handle, IdT) {
    return __awaiter(this, void 0, void 0, function* () {
        let TeknisiOld = yield getTeknisi(0, IdT);
        if (!TeknisiOld) {
            return null;
        }
        TeknisiOld.Handle.push(Handle);
        let point = 0;
        TeknisiOld.Handle.forEach((element) => {
            point += element.point;
        });
        TeknisiOld.point = point;
        delete TeknisiOld._id;
        // await upSektor(TeknisiOld.Sektor,TeknisiOld.point,"+")
        // await upWitel(TeknisiOld.Witel,TeknisiOld.point,"+")
        // await upReg(TeknisiOld.Regional,TeknisiOld.point,"+")
        let Data = TeknisiOld;
        yield (0, Service_1.addFilter)(Data.Regional, Data.Witel, Data.Sektor);
        let Update = yield Model_1.TeknisiModel.findOneAndUpdate({ IDTelegram: IdT }, TeknisiOld);
        if (!Update) {
            return null;
        }
        return true;
    });
}
exports.updateHandle = updateHandle;
function updateUser(User, IdT) {
    return __awaiter(this, void 0, void 0, function* () {
        let TeknisiOld = yield getTeknisi(0, IdT);
        if (!TeknisiOld) {
            return null;
        }
        delete User._id;
        let Update = yield Model_1.TeknisiModel.findOneAndUpdate({ IDTelegram: IdT }, User);
        if (!Update) {
            return null;
        }
        return true;
    });
}
exports.updateUser = updateUser;
function getAll(filter) {
    return __awaiter(this, void 0, void 0, function* () {
        let Teknisies;
        if (!filter) {
            Teknisies = yield Model_1.TeknisiModel.find({});
        }
        else {
            Teknisies = yield Model_1.TeknisiModel.find(filter);
        }
        return Teknisies;
    });
}
exports.getAll = getAll;
function addLeadTask(obj) {
    return __awaiter(this, void 0, void 0, function* () {
        let po = obj.type == "gamasTypeA" ? 2
            : obj.type == "gamasTypeB" ? 3
                : obj.type == "gamasTypeC" ? 4
                    : obj.type == "tugasTl" ? 1
                        : 0;
        let newTask = {
            type: obj.type,
            id_generate: obj.idGenerate,
            nama: obj.namaTeknisi,
            keterangan: obj.keterangan,
            point: po,
            done: false,
            date: new Date()
        };
        let teknisi;
        try {
            teknisi = yield Model_1.TeknisiModel.findOne({ NIK: obj.Nik });
        }
        catch (e) {
            console.log(e);
            return false;
        }
        //console.log(teknisi)
        if (!teknisi) {
            return false;
        }
        if (teknisi._id) {
            delete teknisi._id;
        }
        teknisi.Handle.push(newTask);
        bot_1.broadcast.emit("send", Number(teknisi.IDTelegram), "kamu mendapatkan tugas baru");
        yield updateUser(teknisi, teknisi.IDTelegram);
        return true;
    });
}
exports.addLeadTask = addLeadTask;
//broadcast.emit("send",1276258511,"hi")
//export function updatePoint()
