import Express from "express";
import { Router } from "express";
import EmailClient from "../EmailClient";
import EmailNotifier from "../processes/EmailNotifier";
import { MongoClient } from "mongodb";
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
  const uri =
    "mongodb+srv://backend:hamzaIsAMediocreProgrammer@cluster0-97ewx.gcp.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true });
  const connection = await client.connect();

  let test = new EmailNotifier(connection);
  res.send("ok");
});
