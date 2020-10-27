import { DateTime, DurationObject } from "luxon";
export default class SpreadSheetSchedual {
    private _keyPath;
    private _spreadSheetID;
    private _sheetName;
    private _rowRange;
    private _columns;
    private _firstWeek;
    private _timeZone;
    private _callback;
    private _todayTag;
    private _tommorowTag;
    private _timeShiftCallback;
    private _cells;
    constructor(config: SpreadSheetConfig, checkInterval: number, callback: (value: string, today: DateTime) => string, timeShiftCallback?: (today: DateTime) => DurationObject);
    private updateCells;
    private weeksFromBeginingOfYear;
    private today;
    private tommorow;
    private getCurrentWeek;
    private getRangeString;
    private getCells;
    private getCell;
    private getTodayCellData;
    private getTommorowCellData;
    get todayTag(): string;
    get tommorowTag(): string;
}
export interface CellData {
    dayOfWeek: number;
    weekNumber: number;
    cellValue?: String;
}
export interface SpreadSheetConfig {
    keyPath: string;
    spreadSheetID: string;
    sheetName: string;
    firstRow: number;
    lastRow: number;
    columns: Array<"A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K" | "L" | "M" | "N" | "O" | "P" | "Q" | "R" | "S" | "T" | "U" | "V" | "W" | "X" | "Y" | "Z">;
    firstWeek: {
        day: number;
        month: number;
        year: number;
    };
    timeZone: string;
}
