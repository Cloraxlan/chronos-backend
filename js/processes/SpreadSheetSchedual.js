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
var luxon_1 = require("luxon");
var fs_1 = __importDefault(require("fs"));
var JWT = require("google-auth-library").JWT;
var SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"];
var SpreadSheetSchedual = /** @class */ (function () {
    //checkInterval is the time in miliseconds
    //callback is the function called with the value found in the spreadsheet and then returns the tag that corresponds with it ex: given 1 and it is tuesdays it responds with tuesday(hhs schedual)
    //Time shift callback shifts the correct day back based on what time it is
    function SpreadSheetSchedual(config, checkInterval, callback, timeShiftCallback) {
        var _this = this;
        if (timeShiftCallback === void 0) { timeShiftCallback = function (today) {
            return {};
        }; }
        this._todayTag = null;
        this._tommorowTag = null;
        this._cells = [[]];
        this._keyPath = config.keyPath;
        this._spreadSheetID = config.spreadSheetID;
        this._sheetName = config.sheetName;
        this._rowRange = [config.firstRow, config.lastRow];
        this._columns = config.columns;
        this._firstWeek = luxon_1.DateTime.fromObject(config.firstWeek);
        this._timeZone = config.timeZone;
        this._callback = callback;
        this._timeShiftCallback = timeShiftCallback;
        this.updateCells();
        var midnight = this.tommorow();
        midnight.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
        var miliUntilMidnight = midnight
            .diff(this.today())
            .as("millisecond");
        //Sets the first interval at midnight
        setTimeout(function () {
            _this.updateCells();
            setInterval(function () {
                _this.updateCells();
            }, checkInterval);
        }, miliUntilMidnight);
    }
    SpreadSheetSchedual.prototype.updateCells = function () {
        var _this = this;
        this.getCells().then(function (cells) {
            _this._cells = cells;
        });
    };
    SpreadSheetSchedual.prototype.weeksFromBeginingOfYear = function (day) {
        return day.weekNumber;
    };
    SpreadSheetSchedual.prototype.today = function () {
        var today = luxon_1.DateTime.local().setZone(this._timeZone);
        var shift = this._timeShiftCallback(today);
        return today.minus(shift);
    };
    SpreadSheetSchedual.prototype.tommorow = function () {
        return this.today().plus({ days: 1 });
    };
    SpreadSheetSchedual.prototype.getCurrentWeek = function (day) {
        if (this._firstWeek.weekNumber <= this.weeksFromBeginingOfYear(day)) {
            return this.weeksFromBeginingOfYear(day) - this._firstWeek.weekNumber;
        }
        return 53 - this._firstWeek.weekNumber + this.weeksFromBeginingOfYear(day);
    };
    SpreadSheetSchedual.prototype.getRangeString = function (firstRow, lastRow, currentPage) {
        var range = "";
        for (var i = 0; i < this._columns.length; i++) {
            range +=
                "ranges=" +
                    currentPage +
                    "!" +
                    this._columns[i] +
                    firstRow +
                    ":" +
                    this._columns[i] +
                    lastRow +
                    "&";
        }
        return range;
    };
    SpreadSheetSchedual.prototype.getCells = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data, key, client, url, res, clean;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = fs_1.default.readFileSync(this._keyPath).toString();
                        key = JSON.parse(data.toString());
                        client = new JWT({
                            email: key.client_email,
                            key: key.private_key,
                            scopes: SCOPES,
                        });
                        url = "https://sheets.googleapis.com/v4/spreadsheets/" +
                            this._spreadSheetID +
                            "/values:batchGet?" +
                            this.getRangeString(this._rowRange[0], this._rowRange[1], this._sheetName) +
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
    };
    //Get cell values based on day of week and week number(both starting at 0) for every cellData object
    //This is done to make only one api request needed
    SpreadSheetSchedual.prototype.getCell = function (cellRequests) {
        var cells = this._cells;
        cellRequests.map(function (request, i) {
            cellRequests[i].cellValue = cells[request.dayOfWeek][request.weekNumber];
        });
        return cellRequests;
    };
    SpreadSheetSchedual.prototype.getTodayCellData = function () {
        return {
            dayOfWeek: this.today().weekday - 1,
            weekNumber: this.getCurrentWeek(this.today()),
        };
    };
    SpreadSheetSchedual.prototype.getTommorowCellData = function () {
        return {
            dayOfWeek: this.tommorow().weekday - 1,
            weekNumber: this.getCurrentWeek(this.tommorow()),
        };
    };
    Object.defineProperty(SpreadSheetSchedual.prototype, "todayTag", {
        //No longer used
        //Now all cell values saved and calculated in real time to allow time shifting
        /*
        //Sets the values for today and tommorow during the interval given
        private async getTodayAndTommorow() {
          let cells: CellData[] = await this.getCell([
            this.getTodayCellData(),
            this.getTommorowCellData(),
          ]);
      
          this._todayTag = this._callback(cells[0].cellValue as string, this.today());
          this._tommorowTag = this._callback(
            cells[1].cellValue as string,
            this.tommorow()
          );
        }
        */
        get: function () {
            var todayTag = "";
            todayTag = this.getCell([this.getTodayCellData()])[0].cellValue;
            return this._callback(todayTag, this.today());
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SpreadSheetSchedual.prototype, "tommorowTag", {
        get: function () {
            var tommorowTag = "";
            tommorowTag = this.getCell([this.getTommorowCellData()])[0]
                .cellValue;
            return this._callback(tommorowTag, this.tommorow());
        },
        enumerable: false,
        configurable: true
    });
    return SpreadSheetSchedual;
}());
exports.default = SpreadSheetSchedual;
