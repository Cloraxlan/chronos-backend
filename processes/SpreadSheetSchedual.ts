import { DateTime } from "luxon";
import fs from "fs";
const { JWT } = require("google-auth-library");
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"];

export default class SpreadSheetSchedual {
  private _keyPath: string;
  private _spreadSheetID: string;
  private _sheetName: string;
  private _rowRange: [number, number];
  private _columns: Array<
    | "A"
    | "B"
    | "C"
    | "D"
    | "E"
    | "F"
    | "G"
    | "H"
    | "I"
    | "J"
    | "K"
    | "L"
    | "M"
    | "N"
    | "O"
    | "P"
    | "Q"
    | "R"
    | "S"
    | "T"
    | "U"
    | "V"
    | "W"
    | "X"
    | "Y"
    | "Z"
  >;
  private _firstWeek: DateTime;
  private _timeZone: string;
  private _callback: (value: string) => string;
  private _todayTag: string | null = null;
  private _tommorowTag: string | null = null;

  //checkInterval is the time in miliseconds
  //callback is the function called with the value found in the spreadsheet and then returns the tag that corresponds with it ex: given 1 and it is tuesdays it responds with tuesday(hhs schedual)
  constructor(
    config: SpreadSheetConfig,
    checkInterval: number,
    callback: (value: string) => string
  ) {
    this._keyPath = config.keyPath;
    this._spreadSheetID = config.spreadSheetID;
    this._sheetName = config.sheetName;
    this._rowRange = [config.firstRow, config.lastRow];
    this._columns = config.columns;
    this._firstWeek = DateTime.fromObject(config.firstWeek);
    this._timeZone = config.timeZone;
    this._callback = callback;
    this.getTodayAndTommorow();
    setInterval(() => {
      this.getTodayAndTommorow();
    }, checkInterval);
  }
  private weeksFromBeginingOfYear(): number {
    return this.today().weekNumber;
  }
  private today(): DateTime {
    return DateTime.local().setZone(this._timeZone);
  }
  private tommorow(): DateTime {
    return this.today().plus({ days: 1 });
  }
  private getCurrentWeek(): number {
    if (this._firstWeek.weekNumber <= this.weeksFromBeginingOfYear()) {
      return this.weeksFromBeginingOfYear() - this._firstWeek.weekNumber;
    }
    return 53 - this._firstWeek.weekNumber + this.weeksFromBeginingOfYear();
  }
  private getRangeString(
    firstRow: number,
    lastRow: number,
    currentPage: string
  ): string {
    let range = "";
    for (let i: number = 0; i < this._columns.length; i++) {
      range +=
        "ranges=" +
        currentPage +
        "!" +
        this._columns[i] +
        firstRow +
        ":" +
        this._columns[i] +
        lastRow +
        "&";
    }
    return range;
  }
  private async getCells(): Promise<String[][]> {
    let data: String = fs.readFileSync(this._keyPath).toString();
    let key = JSON.parse(data.toString());
    const client = new JWT({
      email: key.client_email,
      key: key.private_key,
      scopes: SCOPES,
    });
    const url =
      `https://sheets.googleapis.com/v4/spreadsheets/` +
      this._spreadSheetID +
      `/values:batchGet?` +
      this.getRangeString(
        this._rowRange[0],
        this._rowRange[1],
        this._sheetName
      ) +
      `majorDimension=ROWS&valueRenderOption=FORMATTED_VALUE&dateTimeRenderOption=FORMATTED_STRING`;

    let res = await client.request({ url });
    let clean: String[][] = [[]];
    res.data.valueRanges.map(
      (valueRanges: { values: String[][] }, i: number) => {
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
      }
    );

    return clean;
  }
  //Get cell values based on day of week and week number(both starting at 0) for every cellData object
  //This is done to make only one api request needed
  private getCell(cellRequests: CellData[]): CellData[] {
    this.getCells().then((cells) => {
      cellRequests.map((request, i) => {
        cellRequests[i].cellValue =
          cells[request.dayOfWeek][request.weekNumber];
      });
    });
    return cellRequests;
  }
  private getTodayCellData(): CellData {
    return {
      dayOfWeek: this.today().weekday - 1,
      weekNumber: this.getCurrentWeek(),
    };
  }
  private getTommorowCellData(): CellData {
    return {
      dayOfWeek: this.tommorow().weekday - 1,
      weekNumber: this.getCurrentWeek(),
    };
  }
  //Sets the values for today and tommorow during the interval given
  private getTodayAndTommorow() {
    let cells: CellData[] = this.getCell([
      this.getTodayCellData(),
      this.getTommorowCellData(),
    ]);
    this._todayTag = this._callback(cells[0].cellValue as string);
    this._tommorowTag = this._callback(cells[1].cellValue as string);
  }
  public get todayTag(): string {
    if (this._todayTag) {
      this._todayTag;
    }
    this.getTodayAndTommorow();
    return this._todayTag as string;
  }
  public get tommorowTag(): string {
    if (this._tommorowTag) {
      this._tommorowTag;
    }
    this.getTodayAndTommorow();
    return this._tommorowTag as string;
  }
}

export interface CellData {
  dayOfWeek: number;
  weekNumber: number;
  cellValue?: String;
}
export interface SpreadSheetConfig {
  //Location of api key
  keyPath: string;
  //The google sheet file id
  spreadSheetID: string;
  //The name of the specific sheet on the google sheet file
  sheetName: string;
  //First and last row number
  firstRow: number;
  lastRow: number;
  //What columns are being used
  columns: Array<
    | "A"
    | "B"
    | "C"
    | "D"
    | "E"
    | "F"
    | "G"
    | "H"
    | "I"
    | "J"
    | "K"
    | "L"
    | "M"
    | "N"
    | "O"
    | "P"
    | "Q"
    | "R"
    | "S"
    | "T"
    | "U"
    | "V"
    | "W"
    | "X"
    | "Y"
    | "Z"
  >;
  //The date of the first day of the first week of the schedual
  firstWeek: { day: number; month: number; year: number };
  timeZone: string;
}
