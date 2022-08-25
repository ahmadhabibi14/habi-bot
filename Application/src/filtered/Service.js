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
exports.getReg = exports.getWitel = exports.getSektor = exports.addFilter = void 0;
const Model_1 = require("./Model");
/*
  @param regional : regional name of a new teknisi
  @param witel : witel name of a new teknisi
  @param sektor : sektor name of a new teknisi
  @function puporse : {
    create and store regional on database
  }
*/
function addFilter(regional, witel, sektor) {
    return __awaiter(this, void 0, void 0, function* () {
        let regionalData = yield Model_1.regionalModel.findOne({ name: regional });
        if (!regionalData) {
            let newRegionalData = new Model_1.regionalModel({
                name: regional,
                witel: [witel],
            });
            newRegionalData.save();
        }
        else {
            // assign witel to this regional
            if (!regionalData.witel.find((e) => e == witel)) {
                regionalData.witel.push(witel);
            }
            let regionalDataWithoutId = {
                name: regionalData.name,
                witel: regionalData.witel
            };
            yield Model_1.regionalModel.findOneAndUpdate({ name: regional }, regionalDataWithoutId);
        }
        /*
          witel configuration here
        */
        let witelData = yield Model_1.witelModel.findOne({ name: witel });
        if (!witelData) {
            let newWitelData = new Model_1.witelModel({
                name: witel,
                sektor: [sektor]
            });
            newWitelData.save();
        }
        else {
            if (!witelData.sektor.find((e) => e == sektor)) {
                witelData.sektor.push(sektor);
            }
            let witelDataWithoutId = {
                name: witelData.name,
                sektor: witelData.sektor
            };
            yield Model_1.witelModel.findOneAndUpdate({ name: witel }, witelDataWithoutId);
        }
        /*
          last is sektor
        */
        let sektorData = yield Model_1.sektorModel.findOne({ name: sektor });
        if (!sektorData) {
            new Model_1.sektorModel({
                name: sektor,
            }).save();
        }
    });
}
exports.addFilter = addFilter;
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
