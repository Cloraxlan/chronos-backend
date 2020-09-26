import Period from "./Period";

export default class Schedual {
  private _name: string;
  private _days: (0 | 1 | 2 | 3 | 4 | 5 | 6)[];
  private _periods: Period[];
  constructor(
    name: string,
    days: (0 | 1 | 2 | 3 | 4 | 5 | 6)[],
    periods: Period[]
  ) {
    this._name = name;
    this._days = days;
    this._periods = periods;
  }
  public get name(): string {
    return this._name;
  }
  public get days(): (0 | 1 | 2 | 3 | 4 | 5 | 6)[] {
    return this._days;
  }
  //Gets the period by given number
  public getPeriod(period: number): Period {
    return this._periods[period];
  }
  //Gets the current period based on time WARNING MAKE SURE TIMEZONES ARE THE SAME
  //Returns null if none currently
  public currentPeriod(): Period | null {
    let hour: number = new Date().getHours();
    let minutes: number = new Date().getMinutes();
    for (let i = 0; i < this._periods.length; i++) {
      let period = this._periods[i];
      if (period.start[0] <= hour && hour <= period.end[0]) {
        if (hour == period.end[0]) {
          if (period.start[1] <= minutes && minutes <= period.end[1]) {
            return period;
          }
        }
        return period;
      }
    }

    return null;
  }
}
