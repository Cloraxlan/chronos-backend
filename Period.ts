import { Interval } from "luxon";

export default class Period {
  private _name: string;
  //Not needed at the moment likely needed later when things other than email expanded
  //private _activity?: string;
  private _start: [number, number];
  private _end: [number, number];
  constructor(name: string, start: [number, number], end: [number, number]) {
    this._name = name;
    this._start = start;
    this._end = end;
  }
  public get name(): string {
    return this._name;
  }
  public get start(): [number, number] {
    return this._start;
  }
  public get end(): [number, number] {
    return this._end;
  }
}
