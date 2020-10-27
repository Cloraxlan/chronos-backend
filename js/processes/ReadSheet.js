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
/*


   Testing file, most stuff moved to SpreadSheetSchedual


*/
var fs_1 = __importDefault(require("fs"));
var luxon_1 = require("luxon");
var SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"];
var KEY_PATH = "backend/processes/key.json";
var JWT = require("google-auth-library").JWT;
var LAST_ROW = 43;
var FIRST_ROW = 7;
var CURRENT_PAGE = "Semester 1";
var LETTERS = ["G", "H", "I", "J", "K"];
var SPREADSHEET_ID = "1ehSc95BR3hHOO4X9-T1TEOgl5NpzG1EcVoQrbLzFKPE";
var firstWeek = luxon_1.DateTime.fromObject({ day: 24, month: 8, year: 2020 });
var weeksFromBeginingOfYear = function () {
    return luxon_1.DateTime.local().weekNumber;
};
var getCurrentWeek = function () {
    if (firstWeek.weekNumber <= weeksFromBeginingOfYear()) {
        return weeksFromBeginingOfYear() - firstWeek.weekNumber;
    }
    return 53 - firstWeek.weekNumber + weeksFromBeginingOfYear();
};
var getRangeString = function (firstRow, lastRow, currentPage) {
    var range = "";
    for (var i = 0; i < LETTERS.length; i++) {
        range +=
            "ranges=" +
                currentPage +
                "!" +
                LETTERS[i] +
                firstRow +
                ":" +
                LETTERS[i] +
                lastRow +
                "&";
    }
    return range;
};
function getCells() {
    return __awaiter(this, void 0, void 0, function () {
        var data, key, client, url, res, clean;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    data = fs_1.default.readFileSync(KEY_PATH).toString();
                    key = JSON.parse(data.toString());
                    client = new JWT({
                        email: key.client_email,
                        key: key.private_key,
                        scopes: SCOPES,
                    });
                    url = "https://sheets.googleapis.com/v4/spreadsheets/" +
                        SPREADSHEET_ID +
                        "/values:batchGet?" +
                        getRangeString(FIRST_ROW, LAST_ROW, CURRENT_PAGE) +
                        "majorDimension=ROWS&valueRenderOption=FORMATTED_VALUE&dateTimeRenderOption=FORMATTED_STRING";
                    return [4 /*yield*/, client.request({ url: url })];
                case 1:
                    res = _a.sent();
                    clean = [[]];
                    res.data.valueRanges.map(function (valueRanges, i) {
                        var values = valueRanges.values;
                        values.map(function (cellArr) {
                            var cell = cellArr[0];
                            if (cell != null && cell != undefined) {
                                clean[i].push(cell);
                            }
                        });
                        if (i != res.data.valueRanges.length - 1) {
                            clean.push([]);
                        }
                    });
                    return [2 /*return*/, clean];
            }
        });
    });
}
getCells().then(function (cells) {
    console.log(cells[4][16]);
});
