import { Router } from "express";
import { connection } from "../processes/MongoConnection";
import { Collection } from "mongodb";
import SuperSchedual from "../SuperSchedual";

export default Router().get("/", async (req, res) => {
  console.log();
  let collection: Collection = (await connection)
    .db("Chronos")
    .collection("commonScheduals");
  let hhsDoc: SuperSchedual | null = await collection.findOne({ name: "hhs" });
  res.json(hhsDoc);
});
