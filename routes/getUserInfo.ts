import { Router } from "express";
import SessionHandler from "../processes/SessionHandler";
import APIResponce from "../interfaces/Responce";
import { Account } from "../interfaces/Account";
export default Router().post("/", async (req, res) => {
  let responceJson: APIResponce;

  let session: SessionHandler = new SessionHandler();
  await session.init(req.body.sessionId);
  try {
    await session.validate();
    let account: Account = (await session.getAccount()) as Account;
    responceJson = { success: true };
    let data = {
      email: account.email,
      notifications: account.emailNotifications,
    };
    responceJson.data = data;
  } catch (error) {
    if (error == "Invalid Token") {
      responceJson = { success: false, reason: 401 };
    } else {
      responceJson = { success: false, reason: 500 };
    }
  }
  res.json(responceJson);
});
