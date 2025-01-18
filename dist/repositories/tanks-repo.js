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
exports.tanksRepo = void 0;
const mongodb_1 = require("mongodb");
const db_1 = require("../config/db");
const utils_1 = require("../utils");
exports.tanksRepo = {
    getTanks(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id, tankNumber, serialNumber, material, volume, startLastHydrotestDate, endLastHydrotestDate, startLastInspectionDate, endLastInspectionDate, startGradeValue, endGradeValue, limit = '10', sortBy = 'date', sortOrder = 'desc', page = '1', }) {
            const filter = {};
            if (id) {
                filter._id = mongodb_1.ObjectId.createFromHexString(id);
            }
            if (tankNumber) {
                filter.tankNumber = Number(tankNumber);
            }
            if (serialNumber) {
                filter.serialNumber = serialNumber;
            }
            if (material) {
                filter.material = material;
            }
            if (volume) {
                filter.volume = Number(volume);
            }
            if (startLastHydrotestDate || endLastHydrotestDate) {
                filter.lastHydrotestDate = {};
                if (startLastHydrotestDate) {
                    filter.lastHydrotestDate.$gte = new Date(startLastHydrotestDate);
                }
                if (endLastHydrotestDate) {
                    filter.lastHydrotestDate.$lte = new Date(endLastHydrotestDate);
                }
            }
            if (startLastInspectionDate || endLastInspectionDate) {
                filter.lastInspectionDate = {};
                if (startLastInspectionDate) {
                    filter.lastInspectionDate.$gte = new Date(startLastInspectionDate);
                }
                if (endLastInspectionDate) {
                    filter.lastInspectionDate.$lte = new Date(endLastInspectionDate);
                }
            }
            if (startGradeValue || endGradeValue) {
                filter.grade = {};
                if (startGradeValue) {
                    const gradeValue = Number(startGradeValue);
                    if ((0, utils_1.isValidGrade)(gradeValue)) {
                        filter.grade.$gte = gradeValue;
                    }
                }
                if (endGradeValue) {
                    const gradeValue = Number(endGradeValue);
                    if ((0, utils_1.isValidGrade)(gradeValue)) {
                        filter.grade.$lte = gradeValue;
                    }
                }
            }
            return yield db_1.tankCollection
                .find(filter)
                .sort({ [sortBy]: sortOrder })
                .limit(Number(limit))
                .skip((Number(page) - 1) * Number(limit))
                .toArray();
        });
    },
};
