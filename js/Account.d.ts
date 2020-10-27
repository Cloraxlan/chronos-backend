import Schedual from "./Schedual";
export default class Account {
    private _email;
    private _scheduals;
    private _emailNotifications;
    constructor(email: string, scheduals: Schedual[], emailNotifications: boolean);
    get email(): string;
    schedual(day: number): Schedual;
}
