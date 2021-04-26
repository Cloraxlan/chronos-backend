import { Router } from "express";
import { connection } from "../MongoConnection";

export default Router().get("/", async (req, res) => {
  res.send("success");
  const Heroku = require("heroku-client");
  const heroku = new Heroku({ token: "0a336d67-744a-4784-b9bc-17af19c42fb9" });
  heroku.delete("/apps/chronoshhs/dynos/web").then((app: any) => {
    console.log(app);
  });
});
