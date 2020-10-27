"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var indexPage_1 = __importDefault(require("./routes/indexPage"));
var hhs_1 = __importDefault(require("./routes/hhs"));
var hhsDay_1 = __importDefault(require("./routes/hhsDay"));
var cors = require('cors');
//Creates express server
var app = express_1.default();
require("dotenv").config();
app.use(cors());
app.set("views", path_1.default.join(__dirname, "views"));
//Sets html as rendering engine
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.use("/", indexPage_1.default);
app.use("/hhs", hhs_1.default);
app.use("/HHSTodayIs", hhsDay_1.default);
app.listen(process.env.PORT);
