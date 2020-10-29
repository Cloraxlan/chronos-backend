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
var cors = require("cors");

//Creates express server
let app = Express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
require("dotenv").config();

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

app.listen(process.env.PORT);
