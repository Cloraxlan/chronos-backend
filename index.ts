import Express from "express";
import path from "path";
import indexPage from "./routes/indexPage";
import hhs from "./routes/hhs";
import SpreadSheetSchedual from "./processes/SpreadSheetSchedual";
import { DateTime } from "luxon";
import hhsDay from "./routes/hhsDay";
import authenticate from "./routes/authenticate";
import bodyParser from "body-parser";
import getUserInfo from "./routes/getUserInfo";
import setCustom from "./processes/schedualCustomization/setCustom";
import getCustom from "./processes/schedualCustomization/getCustom";
import getTime from "./processes/timeCustomization/getTime";
import setTime from "./processes/timeCustomization/setTime";
var cors = require("cors");

//Creates express server
let app = Express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
require("dotenv").config();
const nocache = require("nocache");

app.use(nocache());
app.use(cors());
app.set("views", path.join(__dirname, "views"));
//Sets html as rendering engine
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.use("/", indexPage);
app.use("/hhs", hhs);
app.use("/HHSTodayIs", hhsDay);
app.use("/authenticate", authenticate);
app.use("/getUserInfo", getUserInfo);
app.use("/schedualCustomization/setCustom", setCustom);
app.use("/schedualCustomization/getCustom", getCustom);
app.use("/customTime/setScheduals", setTime);
app.use("/customTime/getScheduals", getTime);
app.listen(process.env.PORT);
