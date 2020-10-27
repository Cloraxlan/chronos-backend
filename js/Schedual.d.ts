import Period from "./Period";
export default class Schedual {
    private _name;
    private _days;
    private _periods;
    constructor(name: string, days: (0 | 1 | 2 | 3 | 4 | 5 | 6)[], periods: Period[]);
    get name(): string;
    get days(): (0 | 1 | 2 | 3 | 4 | 5 | 6)[];
    getPeriod(period: number): Period;
    currentPeriod(): Period | null;
}
