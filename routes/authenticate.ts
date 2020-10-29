import { Router } from "express";
import fetch from "node-fetch";
import SeassionHandler from "../processes/SessionHandler";
import { SessionId } from "../interfaces/SessionId";
import { authResponce } from "../interfaces/Responce";
export default Router().post("/", async (req, res) => {
  let responceJson: authResponce;
  let tokenAuthRes = await fetch(
    "https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=" +
      req.body.accessToken
  );
  switch (tokenAuthRes.status) {
    case 200:
      let tokenData = await tokenAuthRes.json();
      let session = new SeassionHandler();
      session.init(tokenData.email);
      if (!(await session.verifyEmail())) {
        await session.createAcccount();
      }
      responceJson = {
        sessionId: await session.addToken(),
        success: true,
      };

      break;

    default:
      responceJson = { success: false, reason: 401 };
      break;
  }

  res.json(responceJson);
});
