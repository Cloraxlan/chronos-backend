import Express from "express";
import path from "path";
import indexPage from "./routes/indexPage";
import hhs from "./routes/hhs";
import SpreadSheetSchedual from "./processes/SpreadSheetSchedual";
import { DateTime } from "luxon";
import hhsDay from "./routes/hhsDay";
//Creates express server
let app = Express();

require("dotenv").config();

app.set("views", path.join(__dirname, "views"));
//Sets html as rendering engine
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.use("/", indexPage);
app.use("/hhs", hhs);
app.use("/HHSTodayIs", hhsDay);

app.listen(process.env.PORT);
