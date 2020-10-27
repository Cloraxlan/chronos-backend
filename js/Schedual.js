"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Schedual = /** @class */ (function () {
    function Schedual(name, days, periods) {
        this._name = name;
        this._days = days;
        this._periods = periods;
    }
    Object.defineProperty(Schedual.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Schedual.prototype, "days", {
        get: function () {
            return this._days;
        },
        enumerable: false,
        configurable: true
    });
    //Gets the period by given number
    Schedual.prototype.getPeriod = function (period) {
        return this._periods[period];
    };
    //Gets the current period based on time WARNING MAKE SURE TIMEZONES ARE THE SAME
    //Returns null if none currently
    Schedual.prototype.currentPeriod = function () {
        var hour = new Date().getHours();
        var minutes = new Date().getMinutes();
        for (var i = 0; i < this._periods.length; i++) {
            var period = this._periods[i];
            if (period.start[0] <= hour && hour <= period.end[0]) {
                if (hour == period.end[0]) {
                    if (period.start[1] <= minutes && minutes <= period.end[1]) {
                        return period;
                    }
                }
                return period;
            }
        }
        return null;
    };
    return Schedual;
}());
exports.default = Schedual;
