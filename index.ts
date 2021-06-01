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
import getSavedSchedual from "./processes/schedualCustomization/getSavedSchedual";
import setSavedSchedual from "./processes/schedualCustomization/setSavedSchedual";
import createShare from "./processes/sharing/createShare";
import getShare from "./processes/sharing/getShare";
import saveAllData from "./processes/saveData/saveAllData";
import getAllData from "./processes/saveData/getAllData";
import updateHHS from "./processes/admin/updateHHS";
import restart from "./processes/admin/restart";
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
app.use(Express.static("public"));
app.use("/hhs", hhs);
app.use("/HHSTodayIs", hhsDay);
app.use("/authenticate", authenticate);
app.use("/getUserInfo", getUserInfo);
app.use("/schedualCustomization/setCustom", setCustom);
app.use("/schedualCustomization/getCustom", getCustom);
app.use("/customTime/setScheduals", setTime);
app.use("/customTime/getScheduals", getTime);
app.use("/save/getScheduals", getSavedSchedual);
app.use("/save/setScheduals", setSavedSchedual);
app.use("/share/createShare", createShare);
app.use("/share/getShare", getShare);
app.use("/saveData", saveAllData);
app.use("/getData", getAllData);
app.use("/admin/updatehhs", updateHHS);
app.use("/admin/restart", restart);

app.listen(process.env.PORT);
