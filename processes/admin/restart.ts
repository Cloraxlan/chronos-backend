import { Router } from "express";
import { connection } from "../MongoConnection";

export default Router().get("/", async (req, res) => {
  res.send("success");

  process.exit();
});
