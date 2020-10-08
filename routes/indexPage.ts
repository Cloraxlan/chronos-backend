import Express from "express";
import { Router } from "express";
import EmailClient from "../EmailClient";
import EmailNotifier from "../processes/EmailNotifier";
import { MongoClient } from "mongodb";
import { connection } from "../processes/MongoConnection";
let email = new EmailClient();

// /
export default Router().get("/", async (req, res) => {
  //res.render("index");
  /*email.send({
    from: "notifier.chronos@gmail.com",
    to: "sbluek546@gmail.com",
    subject: "Sending Email using Node.js[nodemailer]",
    text: "That was easy!",
  });
  */

  let test = new EmailNotifier(connection);
  res.send("ok");
});
