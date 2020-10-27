"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Account = /** @class */ (function () {
    function Account(email, scheduals, emailNotifications) {
        this._email = email;
        this._scheduals = scheduals;
        this._emailNotifications = emailNotifications;
    }
    Object.defineProperty(Account.prototype, "email", {
        get: function () {
            return this._email;
        },
        enumerable: false,
        configurable: true
    });
    //Get schedual based on day 0 = mon 6 = sun
    Account.prototype.schedual = function (day) {
        return this._scheduals[day];
    };
    return Account;
}());
exports.default = Account;
