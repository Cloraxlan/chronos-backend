import Express from "express";
import path from "path";
import indexPage from "./routes/indexPage";
import hhs from "./routes/hhs";
import SpreadSheetSchedual from "./processes/SpreadSheetSchedual";
import { DateTime } from "luxon";
//Creates express server
let app = Express();

require("dotenv").config();
let hhsSS = new SpreadSheetSchedual(
  {
    columns: ["G", "H", "I", "J", "K", "L", "M"],
    firstRow: 7,
    lastRow: 43,
    firstWeek: { day: 24, month: 8, year: 2020 },
    keyPath: "backend\\processes\\key.json",
    sheetName: "Semester 1",
    spreadSheetID: "1ehSc95BR3hHOO4X9-T1TEOgl5NpzG1EcVoQrbLzFKPE",
    timeZone: "America/Chicago",
  },
  1000 * 60 * 60 * 24,
  (value: string, today: DateTime) => {
    switch (Number(value)) {
      case 1:
        return "monday";
      case 2:
        switch (today.weekday) {
          case 2:
            return "tuesday";
          case 4:
            return "thursday";
          default:
            return "red";
        }
      case 3:
        switch (today.weekday) {
          case 3:
            return "wendsday";
          case 5:
            return "friday";
          default:
            return "white";
        }
      case 5:
        return "finals";
      default:
        return "No school";
    }
  },
  (today: DateTime) => {
    if (today.weekday < 6) {
      if (today.weekday == 1) {
        if (today.hour < 7 || (today.hour == 7 && today.minute < 10)) {
          return { days: 1 };
        }
      } else {
        if (today.hour < 7 || (today.hour == 7 && today.minute < 30)) {
          return { days: 1 };
        }
      }
    }
    return {};
  }
);
setTimeout(() => {
  console.log(hhsSS.todayTag);
}, 5000);
app.set("views", path.join(__dirname, "views"));
//Sets html as rendering engine
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.use("/", indexPage);
app.use("/hhs", hhs);
app.listen(process.env.PORT);
