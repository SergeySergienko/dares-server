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
exports.connectDB = exports.partCollection = exports.tankCollection = exports.maintenanceCollection = exports.inspectionCollection = void 0;
const mongodb_1 = require("mongodb");
const uri = process.env.MONGO_URI;
const client = new mongodb_1.MongoClient(uri);
const db = client.db('dares_db');
exports.inspectionCollection = db.collection('inspection');
exports.maintenanceCollection = db.collection('maintenance');
exports.tankCollection = db.collection('tanks');
exports.partCollection = db.collection('parts');
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        yield client.connect();
        console.log('\n--------------------------------------------');
        console.log('\x1b[35m%s\x1b[0m', `[OK] You successfully connected to ${((_a = client.options) === null || _a === void 0 ? void 0 : _a.appName) || 'MongoDB'}!`);
        yield exports.tankCollection.createIndex({ serialNumber: 1 }, { unique: true });
        yield exports.partCollection.createIndex({ alias: 1 }, { unique: true });
        return db;
    }
    catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    }
});
exports.connectDB = connectDB;
exports.default = client;
