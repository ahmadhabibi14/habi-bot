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
exports.updateHandle = exports.newTeknisi = exports.getTeknisi = void 0;
const Model_1 = require("./Model");
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
        let Update = yield Model_1.TeknisiModel.findOneAndUpdate({ IDTelegram: IdT }, TeknisiOld);
        if (!Update) {
            return null;
        }
        return true;
    });
}
exports.updateHandle = updateHandle;
//export function updatePoint()
