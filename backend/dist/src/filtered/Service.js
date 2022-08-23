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
exports.getReg = exports.getWitel = exports.getSektor = exports.upReg = exports.upWitel = exports.upSektor = exports.addReg = exports.addWitel = exports.addSektor = void 0;
const Model_1 = require("./Model");
function addSektor(Sk, point, witel) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let sekName = yield Model_1.sektorModel.findOne({ name: Sk });
            delete sekName._id;
            //console.log(Sk) 
            //console.log(sekName)
            if (!sekName) {
                let newSekName = new Model_1.sektorModel({
                    name: Sk,
                    rata_rata: point,
                    jumblah: 1
                });
                newSekName.save();
                // Update witel
                let Witel = yield Model_1.witelModel.findOne({ name: witel });
                if (!Witel) {
                    return;
                }
                Witel.sektor.push(Sk);
                if (Witel._id)
                    delete Witel._id;
                yield Model_1.witelModel.findOneAndUpdate({ name: witel }, Witel);
                return;
            }
            sekName.rata_rata = (sekName.rata_rata * sekName.jumblah + point) / sekName.jumblah + 1;
            sekName.jumblah += 1;
            yield Model_1.sektorModel.findOneAndUpdate({ name: Sk }, sekName);
        }
        catch (e) {
            return;
        }
    });
}
exports.addSektor = addSektor;
function addWitel(Sk, point, regional) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let witName = yield Model_1.witelModel.findOne({ name: Sk });
            delete witName._id;
            if (!witName) {
                let newWitName = new Model_1.witelModel({
                    name: Sk,
                    rata_rata: point,
                    jumblah: 1
                });
                newWitName.save();
                let Regional = yield Model_1.regionalModel.findOneAndUpdate({ name: regional });
                if (!Regional) {
                    return;
                }
                Regional.witel.push(Sk);
                if (Regional._id)
                    delete Regional._id;
                yield Model_1.regionalModel.findOneAndUpdate({ name: regional }, Regional);
                return;
            }
            witName.rata_rata = (witName.rata_rata * witName.jumblah + point) / witName.jumblah + 1;
            witName.jumblah += 1;
            yield Model_1.witelModel.findOneAndUpdate({ nama: Sk }, witName);
        }
        catch (e) {
            return;
        }
    });
}
exports.addWitel = addWitel;
function addReg(Sk, point) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let regName = yield Model_1.regionalModel.findOne({ name: Sk });
            delete regName._id;
            if (!regName) {
                let newRegName = new Model_1.regionalModel({
                    name: Sk,
                    rata_rata: point,
                    jumblah: 1
                });
                newRegName.save();
                return;
            }
            regName.rata_rata = (regName.rata_rata * regName.jumblah + point) / regName.jumblah + 1;
            regName.jumblah += 1;
            yield Model_1.regionalModel.findOneAndUpdate({ name: Sk }, regName);
        }
        catch (e) {
            return;
        }
    });
}
exports.addReg = addReg;
function upSektor(Sk, point, opr) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let sekName = yield Model_1.sektorModel.findOne({ name: Sk });
            delete sekName._id;
            if (!sekName) {
                return;
            }
            if (opr == "+") {
                sekName.rata_rata = (sekName.rata_rata * sekName.jumblah + point) / sekName.jumblah;
            }
            else {
                sekName.rata_rata = (sekName.rata_rata * sekName.jumblah - point) / sekName.jumblah;
            }
            yield Model_1.sektorModel.findOneAndUpdate({ name: Sk }, sekName);
        }
        catch (e) {
            return;
        }
    });
}
exports.upSektor = upSektor;
function upWitel(Sk, point, opr) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let witName = yield Model_1.witelModel.findOne({ name: Sk });
            delete witName._id;
            if (!witName) {
                return;
            }
            if (opr == "+") {
                witName.rata_rata = (witName.rata_rata * witName.jumblah + point) / witName.jumblah;
            }
            else {
                witName.rata_rata = (witName.rata_rata * witName.jumblah - point) / witName.jumblah;
            }
            yield Model_1.witelModel.findOneAndUpdate({ name: Sk }, witName);
        }
        catch (e) {
            return;
        }
    });
}
exports.upWitel = upWitel;
function upReg(Sk, point, opr) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let regName = yield Model_1.regionalModel.findOne({ name: Sk });
            delete regName._id;
            if (!regName) {
                return;
            }
            if (opr == "+") {
                regName.rata_rata = (regName.rata_rata * regName.jumblah + point) / regName.jumblah;
            }
            else {
                regName.rata_rata = (regName.rata_rata * regName.jumblah - point) / regName.jumblah;
            }
            yield Model_1.regionalModel.findOneAndUpdate({ name: Sk }, regName);
        }
        catch (e) {
            return;
        }
    });
}
exports.upReg = upReg;
function getSektor() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield Model_1.sektorModel.find({});
    });
}
exports.getSektor = getSektor;
function getWitel() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield Model_1.witelModel.find({});
    });
}
exports.getWitel = getWitel;
function getReg() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield Model_1.regionalModel.find({});
    });
}
exports.getReg = getReg;
