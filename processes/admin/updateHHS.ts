import { Router } from "express";
import { connection } from "../MongoConnection";

export default Router().post("/", async (req, res) => {
  let commonScheduals = (await connection)
    .db("Chronos")
    .collection("commonScheduals");
  commonScheduals.findOneAndUpdate(
    {
      name: "hhs",
    },
    { $set: { scheduals: req.body.customization } }
  );

  res.send("success");
});
