import { SessionId } from "./SessionId";

export interface authResponce {
  sessionId?: SessionId;
  success: boolean;
  reason?: number;
}
export default interface APIResponce {
  data?: any;
  success: boolean;
  reason?: number;
}
