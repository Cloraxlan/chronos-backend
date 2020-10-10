/*


   Testing file, most stuff moved to SpreadSheetSchedual


*/
import fs from "fs";
import { DateTime } from "luxon";
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"];
const KEY_PATH = "backend/processes/key.json";
const { JWT } = require("google-auth-library");
const WEEKS = 19;
const FIRST_ROW = 7;
const CURRENT_PAGE = "Semester 1";
const LETTERS = ["G", "H", "I", "J", "K"];
const SPREADSHEET_ID = "1ehSc95BR3hHOO4X9-T1TEOgl5NpzG1EcVoQrbLzFKPE";
const firstWeek = DateTime.fromObject({ day: 24, month: 8, year: 2020 });
let weeksFromBeginingOfYear = (): number => {
  return DateTime.local().weekNumber;
};
let getCurrentWeek = (): number => {
  if (firstWeek.weekNumber <= weeksFromBeginingOfYear()) {
    return weeksFromBeginingOfYear() - firstWeek.weekNumber;
  }
  return 53 - firstWeek.weekNumber + weeksFromBeginingOfYear();
};
let getRangeString = (
  weeks: number,
  firstRow: number,
  currentPage: string
): string => {
  let range = "";
  for (let i: number = 0; i < 5; i++) {
    range +=
      "ranges=" +
      currentPage +
      "!" +
      LETTERS[i] +
      firstRow +
      ":" +
      LETTERS[i] +
      firstRow +
      weeks +
      "&";
  }
  return range;
};
async function getCells(): Promise<String[][]> {
  let data: String = fs.readFileSync(KEY_PATH).toString();
  let key = JSON.parse(data.toString());
  const client = new JWT({
    email: key.client_email,
    key: key.private_key,
    scopes: SCOPES,
  });
  const url =
    `https://sheets.googleapis.com/v4/spreadsheets/` +
    SPREADSHEET_ID +
    `/values:batchGet?` +
    getRangeString(WEEKS, FIRST_ROW, CURRENT_PAGE) +
    `majorDimension=ROWS&valueRenderOption=FORMATTED_VALUE&dateTimeRenderOption=FORMATTED_STRING`;

  let res = await client.request({ url });
  let clean: String[][] = [[]];
  res.data.valueRanges.map((valueRanges: { values: String[][] }, i: number) => {
    let values: String[][] = valueRanges.values;
    values.map((cellArr: String[]) => {
      let cell: String = cellArr[0];
      if (cell != null && cell != undefined) {
        clean[i].push(cell);
      }
    });

    if (i != res.data.valueRanges.length - 1) {
      clean.push([]);
    }
  });

  return clean;
}

getCells().then((cells: String[][]) => {
  console.log(cells[4][getCurrentWeek()]);
});
