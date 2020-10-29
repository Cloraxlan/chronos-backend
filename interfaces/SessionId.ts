import { DateTime, DateObject } from "luxon";

export interface SessionId {
  id: string;
  expiresAt: DateObject;
}
