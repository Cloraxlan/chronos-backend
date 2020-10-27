"use strict";
/*
import { MongoClient, Collection, Cursor, BSONType } from "mongodb";
import Schedual from "../Schedual";
import Account from "../Account";
import Period from "../Period";
import EmailClient, { EmailOption } from "../EmailClient";

const dbName = "Chronos";
const userDbName = "ChronosUsers";
const OPTION_NOTIFICATION = "NOTIFICATION";
//Interfaces for mongodb docs
interface userObj {
  email: string;
  scheduals: SchedualObj[];
  emailNotifications: boolean;
}
interface SchedualObj {
  name: string;
  days: (0 | 2 | 1 | 3 | 4 | 5 | 6)[];
  periods: Array<Period>;
}
interface PeriodObj {
  name: string;
  start: [number, number];
  end: [number, number];
}
export default class EmailNotifier {
  private _dbConnection: MongoClient;
  private _accounts?: Account[];
  private _emailClient: EmailClient;
  constructor(dbConnection: MongoClient) {
    this._emailClient = new EmailClient();
    this._dbConnection = dbConnection;
    this.getScheduals().then(() => {
      this._accounts?.map((a) => {
        let currentClass = a.schedual(0).currentPeriod()?.name;
        console.log(a.schedual(0).currentPeriod());
        if (currentClass) {
          let options: EmailOption | null = this.getOptions(
            a.email,
            OPTION_NOTIFICATION,
            { class: currentClass }
          );
          if (options) {
            this._emailClient.send(options);
          }
        }
      });
    });
  }
  private async getScheduals() {
    this._accounts = [];
    let userCollection: Cursor<userObj> = this._dbConnection
      .db(dbName)
      .collection(userDbName)
      .find({ emailNotifications: { $eq: true } });
    while (await userCollection.hasNext()) {
      let userDoc: userObj | null = await userCollection.next();
      //Checks for null
      if (userDoc) {
        let schedualsObjs = userDoc.scheduals;
        let scheduals: Array<Schedual> = [];
        schedualsObjs.map((schedual) => {
          let name: string = schedual.name;
          let days: (0 | 2 | 1 | 3 | 4 | 5 | 6)[] = schedual.days;
          let periods: Array<Period> = [];
          schedual.periods.map((period) => {
            let name: string = period.name;
            let start: [number, number] = period.start;
            let end: [number, number] = period.end;

            periods.push(new Period(name, start, end));
          });
          scheduals.push(new Schedual(name, days, periods));
        });
        this._accounts?.push(
          new Account(userDoc.email, scheduals, userDoc.emailNotifications)
        );
        console.log(scheduals);
      }
    }
  }
  //TODO add ability to get one schedual for updating
  private getSchedual(email: string) {}
  private getOptions(
    email: string,
    type: string,
    options: any | null = null
  ): EmailOption | null {
    switch (type) {
      case OPTION_NOTIFICATION:
        return {
          from: "notifier.chronos@gmail.com",
          to: email,
          subject: "Next Period Alert",
          text:
            "Your next class : " + options.class + " is starting in 5 minutes",
        };

      default:
        return null;
    }
  }
}
*/
