"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
var mongodb_1 = require("mongodb");
var uri = "mongodb+srv://backend:hamzaIsAMediocreProgrammer@cluster0-97ewx.gcp.mongodb.net/test?retryWrites=true&w=majority";
var client = new mongodb_1.MongoClient(uri, { useNewUrlParser: true });
exports.connection = client
    .connect()
    .then(function (client) {
    return client;
});
