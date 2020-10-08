import { Router } from "express";
import { connection } from "../processes/MongoConnection";
import { Collection } from "mongodb";

export default Router().get("/", async (req, res) => {
  let collection: Collection = connection
    .db("Chronos")
    .collection("commonScheduals");
  let hhsDoc: any = collection.find({ name: "hhs" });
  res.json(hhsDoc);
});
