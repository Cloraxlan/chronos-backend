export default class Period {
    private _name;
    private _start;
    private _end;
    constructor(name: string, start: [number, number], end: [number, number]);
    get name(): string;
    get start(): [number, number];
    get end(): [number, number];
}
