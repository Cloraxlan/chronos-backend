import { Router } from "express";
import { connection } from "../processes/MongoConnection";
import { Collection } from "mongodb";
import SuperSchedual from "../SuperSchedual";

export default Router().get("/", async (req, res) => {});
