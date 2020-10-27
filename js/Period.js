"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Period = /** @class */ (function () {
    function Period(name, start, end) {
        this._name = name;
        this._start = start;
        this._end = end;
    }
    Object.defineProperty(Period.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Period.prototype, "start", {
        get: function () {
            return this._start;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Period.prototype, "end", {
        get: function () {
            return this._end;
        },
        enumerable: false,
        configurable: true
    });
    return Period;
}());
exports.default = Period;
