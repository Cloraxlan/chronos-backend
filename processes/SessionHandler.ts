import { Collection } from "mongodb";
import { connection } from "./MongoConnection";
import { SessionId } from "../interfaces/SessionId";
import { v4 as uuidv4 } from "uuid";
import { Duration, DateTime } from "luxon";
import { Account } from "../interfaces/Account";
import schedualCustomizationSettings from "../interfaces/schedualCustomizationSettings";
import schedualCustomizationTimes from "../interfaces/schedualCustomizationTimes";
let userCollection: Collection | null = null;
let initCollection = async (collectionName: string) => {
  userCollection = (await connection).db("Chronos").collection(collectionName);
};
initCollection("ChronosUsers");
//Days token is alive
const tokenLife = 14;
const defaultAccount = {
  email: "",
  emailNotifications: false,
  sessionIds: [],
  schedualCustomizationSettings: [],
  customTimes: [],
};
export default class SessionHandler {
  private _email: string | null = null;
  private _sessionId: SessionId | null = null;
  //Valid Identifiers are email or sessionID token
  //need async :|
  constructor() {}
  public async init(identifier: string) {
    //If identifier is email it includes @ else its a sessionID
    switch (identifier.includes("@")) {
      case true:
        this._email = identifier;
        let sessionId = await this.getSessionId();
        this._sessionId = sessionId;
        break;

      case false:
        let email = await this.getEmailBySessionToken(identifier);
        this._email = email;
        sessionId = await this.getSessionId();

        this._sessionId = sessionId;

        break;
    }
  }
  public async getAccount(): Promise<Account | null> {
    return await (userCollection as Collection).findOne({
      email: this._email,
    });
    /*nonInitedAccount.sessionIds.map((session, i) => {
      nonInitedAccount.sessionIds[i].expiresAt = DateTime.fromObject(
        session as any
      );
    });*/
    //return nonInitedAccount;
  }

  public async validate() {
    try {
      let account: Account | null = await this.getAccount();
      if (!account) {
        throw "Invalid Token";
      }
      if (
        account.sessionIds.map((sessionId) => {
          if (sessionId.id == this._sessionId?.id) {
            if (
              DateTime.fromObject(sessionId.expiresAt).diffNow().as("seconds") >
              0
            ) {
              return true;
            }
          }
          return false;
        })
      ) {
        return;
      }

      throw "Invalid Token";
    } catch (error) {
      console.log(error);
      return;
    }
  }
  private async cleanTokens() {
    let sessions: SessionId[] = ((await this.getAccount()) as Account)
      .sessionIds;
    let cleanedSessions: SessionId[] = [];
    sessions.map((session: SessionId) => {
      if (DateTime.fromObject(session.expiresAt).diffNow().as("seconds") > 0) {
        cleanedSessions.push(session);
      }
    });
    await (userCollection as Collection).findOneAndUpdate(
      {
        email: this._email,
      },
      { $set: { sessionIds: cleanedSessions } }
    );
  }

  private async createNewToken(): Promise<SessionId> {
    return {
      id: uuidv4(),
      expiresAt: DateTime.local()
        .plus(Duration.fromObject({ days: tokenLife }))
        .toObject(),
    };
  }
  //Gets sessionId based on email
  public async getSessionId(): Promise<SessionId | null> {
    return await (userCollection as Collection).findOne({
      email: this._email,
    });
  }
  public async getEmail(): Promise<string | null> {
    return await (userCollection as Collection).findOne({
      sessionIds: { id: this._sessionId },
    });
  }
  public async updateSchedualCustomization(
    update: schedualCustomizationSettings
  ) {
    let schedualCustomizationSettings:
      | schedualCustomizationSettings[]
      | null = (
      await (userCollection as Collection).findOne({
        email: this._email,
      })
    ).schedualCustomizationSettings;
    if (schedualCustomizationSettings) {
      let updated = false;
      for (let i = 0; i < schedualCustomizationSettings.length; i++) {
        if (schedualCustomizationSettings[i].baseName == update.baseName) {
          schedualCustomizationSettings[i] = update;
          updated = true;
        }
      }
      if (!updated) {
        schedualCustomizationSettings.push(update);
      }
      await (userCollection as Collection).findOneAndUpdate(
        {
          email: this._email,
        },
        {
          $set: {
            schedualCustomizationSettings: schedualCustomizationSettings,
          },
        }
      );
    }
  }
  public async updateSchedualTime(update: schedualCustomizationTimes) {
    await (userCollection as Collection).findOneAndUpdate(
      {
        email: this._email,
      },
      {
        $set: {
          customTimes: update,
        },
      }
    );
  }
  public async getCustom(): Promise<schedualCustomizationSettings | null> {
    return (
      await (userCollection as Collection).findOne({
        email: this._email,
      })
    ).schedualCustomizationSettings;
  }
  public async getCustomTime(): Promise<schedualCustomizationTimes | null> {
    return (
      await (userCollection as Collection).findOne({
        email: this._email,
      })
    ).customTimes;
  }
  public async verifyEmail(): Promise<boolean> {
    try {
      if (
        await (userCollection as Collection).findOne({
          email: this._email,
        })
      ) {
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }
  private async getEmailBySessionToken(token: string): Promise<string | null> {
    return (
      await (userCollection as Collection).findOne({
        "sessionIds.id": token,
      })
    ).email;
  }
  public async addToken(): Promise<SessionId> {
    await this.cleanTokens().catch((err) => {
      console.log(err);
    });
    let newSessionId: SessionId = await this.createNewToken();
    await (userCollection as Collection).findOneAndUpdate(
      {
        email: this._email,
      },
      { $push: { sessionIds: newSessionId } }
    );
    return newSessionId;
  }
  public async createAcccount() {
    let newAccount = defaultAccount;
    newAccount.email = this._email as string;
    await (userCollection as Collection).insertOne(newAccount);
  }
}
