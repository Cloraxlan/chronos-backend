import { SessionId } from "./SessionId";
import schedualCustomizationSettings from "./schedualCustomizationSettings";
import schedualCustomizationTimes from "./schedualCustomizationTimes";

/*import Schedual from "./Schedual";

export default class Account {
  private _email: string;
  private _scheduals: Schedual[];
  private _emailNotifications: boolean;
  constructor(
    email: string,
    scheduals: Schedual[],
    emailNotifications: boolean
  ) {
    this._email = email;
    this._scheduals = scheduals;
    this._emailNotifications = emailNotifications;
  }
  get email(): string {
    return this._email;
  }
  //Get schedual based on day 0 = mon 6 = sun
  public schedual(day: number): Schedual {
    return this._scheduals[day];
  }
}
*/
export interface Account {
  email: string;
  emailNotifications: boolean;
  sessionIds: SessionId[];
  commonSchedualCustomizationSettings: schedualCustomizationSettings;
  customTimes: schedualCustomizationTimes;
}
