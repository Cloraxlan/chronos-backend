import { Router } from "express";
import SessionHandler from "../SessionHandler";
import APIResponce from "../../interfaces/Responce";
import { Account } from "../../interfaces/Account";
export default Router().post("/", async (req, res) => {
  let responceJson: APIResponce;

  let session: SessionHandler = new SessionHandler();
  await session.init(req.body.sessionId);
  try {
    await session.validate();
    session.setAllData(req.body.customization);
    responceJson = { success: true };
  } catch (error) {
    if (error == "Invalid Token") {
      responceJson = { success: false, reason: 401 };
    } else {
      responceJson = { success: false, reason: 500 };
    }
  }
  res.json(responceJson);
});
