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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var SpreadSheetSchedual_1 = __importDefault(require("../processes/SpreadSheetSchedual"));
var hhsSS = new SpreadSheetSchedual_1.default({
    columns: ["G", "H", "I", "J", "K", "L", "M"],
    firstRow: 7,
    lastRow: 43,
    firstWeek: { day: 24, month: 8, year: 2020 },
    keyPath: "key.json",
    sheetName: "Semester 1",
    spreadSheetID: "1ehSc95BR3hHOO4X9-T1TEOgl5NpzG1EcVoQrbLzFKPE",
    timeZone: "America/Chicago",
}, 1000 * 60 * 60 * 24, function (value, today) {
    switch (Number(value)) {
        case 1:
            return "wendsday";
        case 2:
            switch (today.weekday) {
                case 1:
                    return "monday";
                case 4:
                    return "thursday";
                default:
                    return "red";
            }
        case 3:
            switch (today.weekday) {
                case 2:
                    return "tuesday";
                case 5:
                    return "friday";
                default:
                    return "white";
            }
        case 0:
            switch (today.weekday) {
                case 6:
                    return "saturday";
                case 7:
                    return "sunday";
                default:
                    return "noSchool";
            }
        case 5:
            return "finals";
        default:
            return "noSchool";
    }
}, function (today) {
    /*
    if (today.weekday < 6) {
      if (today.weekday == 1) {
        if (today.hour < 7 || (today.hour == 7 && today.minute < 10)) {
          return { days: 1 };
        }
      } else {
        if (today.hour < 7 || (today.hour == 7 && today.minute < 30)) {
          return { days: 1 };
        }
      }
    }
    return {};
  */
    return {};
});
exports.default = express_1.Router().get("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        res.json({ today: hhsSS.todayTag, tommorow: hhsSS.tommorowTag });
        return [2 /*return*/];
    });
}); });
